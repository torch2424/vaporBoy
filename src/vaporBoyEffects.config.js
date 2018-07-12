// Tuna for easy audio effects
import * as Tuna from "tunajs";

// Our effects key
export const VAPORBOY_EFFECTS_LOCALSTORAGE_KEY = "vaporBoyEffects";

export const VAPORBOY_DEFAULT_EFFECTS = {
  vapor: false,
  bassBoost: false,
  monochrome: false,
  inverted: false,
  rainbow: false,
  crt: false
};

// Audio nodes and things
let tuna = undefined;
let lowPassNode = undefined;
let bassBoostNode = undefined;
let delayNode = undefined;

export const vaporAudioEffect = (audioContext, audioBufferSourceNode) => {
  if (!lowPassNode) {
    lowPassNode = audioContext.createBiquadFilter();
    lowPassNode.type = "lowpass";
    lowPassNode.frequency.value = 2750;
  }
  if (!delayNode) {
    if (!tuna) {
      tuna = new Tuna(audioContext);
    }

    delayNode = new tuna.PingPongDelay({
      wetLevel: 0.5, //0 to 1
      feedback: 0.3, //0 to 1
      delayTimeLeft: 150, //1 to 10000 (milliseconds)
      delayTimeRight: 200 //1 to 10000 (milliseconds)
    });
  }

  audioBufferSourceNode.connect(lowPassNode);
  lowPassNode.connect(delayNode);

  return delayNode;
};

// Audio/Video Effects
export const vaporVideoEffect = imageDataArray => {
  // Tint multiplier
  const purpleTint = 2.75;

  for (let i = 0; i < imageDataArray.length; i += 4) {
    // Since we want purple, increase red and blue
    let tintedRed = imageDataArray[i] * purpleTint;
    let tintedBlue = imageDataArray[i + 2] * purpleTint;

    if (tintedRed > 255) {
      tintedRed = 255;
    }
    if (tintedBlue > 255) {
      tintedBlue = 255;
    }

    imageDataArray[i] = tintedRed;
    imageDataArray[i + 2] = tintedBlue;
  }
};

// Audio Effects
export const bassBoostEffect = (audioContext, audioBufferSourceNode) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
  if (!bassBoostNode) {
    bassBoostNode = audioContext.createBiquadFilter();
    bassBoostNode.type = "lowshelf";
    bassBoostNode.frequency.value = 500;
    bassBoostNode.gain.value = 20;
    bassBoostNode.Q.value = 650;
  }

  audioBufferSourceNode.connect(bassBoostNode);

  return bassBoostNode;
};

// Video Effects
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
export const monochromeEffect = imageDataArray => {
  for (let i = 0; i < imageDataArray.length; i += 4) {
    const averageColorValue =
      (imageDataArray[i] + imageDataArray[i + 1] + imageDataArray[i + 2]) / 3;
    imageDataArray[i] = averageColorValue;
    imageDataArray[i + 1] = averageColorValue;
    imageDataArray[i + 2] = averageColorValue;
  }
};

export const invertedEffect = imageDataArray => {
  for (let i = 0; i < imageDataArray.length; i += 4) {
    imageDataArray[i] = 255 - imageDataArray[i];
    imageDataArray[i + 1] = 255 - imageDataArray[i + 1];
    imageDataArray[i + 2] = 255 - imageDataArray[i + 2];
  }
};

export const rainbowEffect = imageDataArray => {
  for (let i = 0; i < imageDataArray.length; i += 4) {
    const averageColorValue =
      (imageDataArray[i] + imageDataArray[i + 1] + imageDataArray[i + 2]) / 3;

    imageDataArray[i] = averageColorValue;
    imageDataArray[i + 1] = averageColorValue;
    imageDataArray[i + 2] = averageColorValue;

    // Get a random number to add to our average
    const colorModifier = Math.floor(Math.random() * averageColorValue);

    const raiseIndex = Math.floor(Math.random() * 2);

    let lowerIndex = raiseIndex;
    while (lowerIndex === raiseIndex) {
      lowerIndex = Math.floor(Math.random() * 2);
    }

    imageDataArray[i + raiseIndex] += colorModifier;
    imageDataArray[i + lowerIndex] -= colorModifier;
  }
};
