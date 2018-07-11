// Our effects key
export const VAPORBOY_EFFECTS_LOCALSTORAGE_KEY = "vaporBoyEffects";

export const VAPORBOY_DEFAULT_EFFECTS = {
  vapor: false,
  bassBoost: false,
  monochrome: false,
  inverted: false,
  rainbow: false
};

// Audio nodes and things
let lowPassFilter = undefined;

// Audio/Video Effects

// Audio Effects
export const bassBoost = (audioContext, audioBufferSourceNode) => {
  if (!lowPassFilter) {
    lowPassFilter = audioContext.createBiquadFilter();
    lowPassFilter.type = "lowpass";
    lowPassFilter.frequency.value = 650;
  }

  audioBufferSourceNode.connect(lowPassFilter);

  return lowPassFilter;
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
