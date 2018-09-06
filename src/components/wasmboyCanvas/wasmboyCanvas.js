// Super Gameboy Border
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

import { getVaporBoyLogo } from "../../vaporboyLogo";

// Import our effects
import {
  vaporAudioEffect,
  vaporVideoEffect,
  bassBoostEffect,
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
      const configPromise = this.configWasmBoy(canvasElement);
      Pubx.get(PUBX_CONFIG.LOADING_KEY).addPromiseToStack(configPromise);
    } else if (WasmBoy.isPlaying()) {
      const setCanvasTask = async () => {
        await WasmBoy.setCanvas(canvasElement);
        await WasmBoy.play();
      };
      Pubx.get(PUBX_CONFIG.LOADING_KEY).addPromiseToStack(setCanvasTask());
    }

    // Also, subscribe to options/effects changes
    const pubxVaporBoyOptionsSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.VAPORBOY_OPTIONS_KEY,
      newState => {
        this.configWasmBoy(canvasElement);
        this.setState({
          ...this.state,
          options: {
            ...newState
          }
        });
      }
    );
    const pubxVaporBoyEffectsSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.VAPORBOY_EFFECTS_KEY,
      newState => {
        this.configWasmBoy(canvasElement);
        this.setState({
          ...this.state,
          effects: {
            ...newState
          }
        });
      }
    );

    this.setState({
      ...this.state,
      options: {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY)
      },
      effects: {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_EFFECTS_KEY)
      },
      pubxVaporBoyOptionsSubscriberKey,
      pubxVaporBoyEffectsSubscriberKey,
      isMounted: true,
      vaporboyImage: getVaporBoyLogo()
    });

    // Re-render every second for the debug menu
    const debugMenuUpdate = () => {
      if (this.state.isMounted) {
        setTimeout(() => {
          if (this.state.options.showDebugMenu) {
            this.setState({
              ...this.state
            });
          }
          debugMenuUpdate();
        }, 1000);
      }
    };
    debugMenuUpdate();
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

    this.setState({
      ...this.state,
      isMounted: false
    });
  }

  configWasmBoy(canvasElement) {
    const wasmBoyConfigTask = async () => {
      const vaporboyOptions = {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY)
      };
      const vaporboyEffects = {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_EFFECTS_KEY)
      };

      if (vaporboyEffects.vapor) {
        vaporboyOptions.gameboyFrameRate = Math.floor(
          vaporboyOptions.gameboyFrameRate * 0.875
        );
      }

      const wasmboyConfig = {
        ...vaporboyOptions,
        saveStateCallback: saveStateObject => {
          // Function called everytime a savestate occurs
          // Used by the WasmBoySystemControls to show screenshots on save states
          if (WasmBoy.getCanvas()) {
            saveStateObject.screenshotCanvasDataURL = WasmBoy.getCanvas().toDataURL();
          }
        },
        updateAudioCallback: (audioContext, audioBufferSourceNode) => {
          // Chain connect the audio nodes
          let audioNode = audioBufferSourceNode;

          if (vaporboyEffects.vapor) {
            audioNode = vaporAudioEffect(audioContext, audioNode);
          }

          if (vaporboyEffects.bassBoost) {
            audioNode = bassBoostEffect(audioContext, audioNode);
          }

          return audioNode;
        },
        updateGraphicsCallback: imageDataArray => {
          if (vaporboyEffects.vapor) {
            vaporVideoEffect(imageDataArray);
          }

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
    };

    return wasmBoyConfigTask();
  }

  render() {
    // Add any extra classes from our effects
    const canvasClasses = ["wasmboy-canvas"];
    if (this.state.effects && this.state.effects.crt) {
      canvasClasses.push("aesthetic-effect-crt");
    }

    // Our insert cartridge menu
    let insertCartridge = <div />;
    if (!WasmBoy.isLoadedAndStarted()) {
      insertCartridge = (
        <div class="wasmboy-canvas__insert-cartridge">
          <img src={this.state.vaporboyImage} />
          <h1>V A P O R B O Y</h1>
          <h3>Please insert a cartridge...</h3>
          <div class="wasmboy-canvas__insert-cartridge__instructions">
            {Pubx.get(PUBX_CONFIG.LAYOUT_KEY).mobile ? (
              <div>⚙️ > Select a ROM</div>
            ) : (
              <div>File > Control Panel > Select a ROM</div>
            )}
          </div>
        </div>
      );
    }

    // Get a debug/fps overlay
    let debugOverlay = <div />;
    if (this.state.options && this.state.options.showDebugMenu) {
      debugOverlay = (
        <div class="wasmboy-canvas__debug-overlay">
          <div class="wasmboy-canvas__debug-overlay__fps">
            FPS: {WasmBoy.getFPS()}
          </div>
        </div>
      );
    }

    return (
      <div class={canvasClasses.join(" ")} aria-hidden="true">
        <div class="wasmboy-canvas__canvas-container">
          <canvas id="wasmboy-canvas" />
        </div>
        {insertCartridge}
        {debugOverlay}
      </div>
    );
  }
}
