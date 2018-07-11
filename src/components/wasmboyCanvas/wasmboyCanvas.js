// Super Gameboy Border
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

// Import our effects
import {
  invertedEffect,
  monochromeEffect,
  rainbowEffect
} from "../../vaporboyEffects.config";

export default class WasmBoyCanvas extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    // Get our HTML5 Canvas element
    const canvasElement = document.querySelector("#wasmboy-canvas");

    // Check if we are already ready and initialized
    // (this is to avoid resetting a game on layout changes)
    if (!WasmBoy.isReady()) {
      this.configWasmBoy(canvasElement);
    } else if (WasmBoy.isPlaying()) {
      const setCanvasTask = async () => {
        await WasmBoy.setCanvas(canvasElement);
        await WasmBoy.play();
      };

      setCanvasTask();
    }

    // Also, subscribe to options/effects changes
    const pubxVaporBoyOptionsSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.VAPORBOY_OPTIONS_KEY,
      () => {
        this.configWasmBoy(canvasElement);
      }
    );
    const pubxVaporBoyEffectsSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.VAPORBOY_EFFECTS_KEY,
      () => {
        this.configWasmBoy(canvasElement);
      }
    );

    this.setState({
      ...this.state,
      pubxVaporBoyOptionsSubscriberKey,
      pubxVaporBoyEffectsSubscriberKey
    });
  }

  componentWillUnmount() {
    Pubx.unsubscribe(
      PUBX_CONFIG.VAPORBOY_OPTIONS_KEY,
      this.state.pubxVaporBoyOptionsSubscriberKey
    );
    Pubx.unsubscribe(
      PUBX_CONFIG.VAPORBOY_EFFECTS_KEY,
      this.state.pubxVaporBoyEffectsSubscriberKey
    );
  }

  configWasmBoy(canvasElement) {
    const wasmBoyConfigTask = async () => {
      const vaporboyOptions = Pubx.get(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY);
      const vaporboyEffects = Pubx.get(PUBX_CONFIG.VAPORBOY_EFFECTS_KEY);

      console.log("Current Pubx Vaporboy Options", vaporboyOptions);
      console.log("Current Pubx Vaporboy Effects", vaporboyEffects);

      const wasmboyConfig = {
        ...vaporboyOptions,
        saveStateCallback: saveStateObject => {
          // Function called everytime a savestate occurs
          // Used by the WasmBoySystemControls to show screenshots on save states
          const canvasElement = document.getElementById("wasmboy-canvas");
          if (canvasElement) {
            saveStateObject.screenshotCanvasDataURL = canvasElement.toDataURL();
          }
        },
        updateGraphicsCallback: imageDataArray => {
          if (vaporboyEffects.rainbow) {
            rainbowEffect(imageDataArray);
          }

          if (vaporboyEffects.inverted) {
            invertedEffect(imageDataArray);
          }

          if (vaporboyEffects.monochrome) {
            monochromeEffect(imageDataArray);
          }
        }
      };

      await WasmBoy.config(wasmboyConfig, canvasElement);
      console.log("WasmBoy is configured!");
    };

    return wasmBoyConfigTask();
  }

  render() {
    // Our insert cartridge menu
    let insertCartridge = "";
    if (!WasmBoy.isReady()) {
      insertCartridge = (
        <div class="wasmboy-canvas__insert-cartridge">
          <img src="assets/vaporboyvhs.png" />
          <h1>V A P O R B O Y</h1>
          <h3>Please insert a cartridge...</h3>
        </div>
      );
    }

    return (
      <div class="wasmboy-canvas">
        {insertCartridge}
        <div class="wasmboy-canvas__canvas-container">
          <canvas id="wasmboy-canvas" />
        </div>
      </div>
    );
  }
}
