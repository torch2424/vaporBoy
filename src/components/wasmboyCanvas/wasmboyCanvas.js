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

const packageJson = require("../../../package.json");

export default class WasmBoyCanvas extends Component {
  constructor() {
    super();
    this.setState({});

    // Not setting on state, as this is used internally
    // For our debug menu update loop.
    this.isMounted = false;
  }

  componentDidMount() {
    // Get our HTML5 Canvas element
    const canvasElement = this.base.querySelector("#wasmboy-canvas");

    // Check if we are already ready and initialized
    // (this is to avoid resetting a game on layout changes)
    if (!WasmBoy.isReady()) {
      const configPromise = this.configWasmBoy(canvasElement);
      Pubx.get(PUBX_CONFIG.LOADING_KEY).addPromiseToStack(configPromise);
    } else if (WasmBoy.isReady() && WasmBoy.isLoadedAndStarted()) {
      const setCanvasTask = async () => {
        await WasmBoy.setCanvas(canvasElement);
        await WasmBoy.play();
        this.handleWasmBoyIsPlayingChange();
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

    this.isMounted = true;
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
      vaporboyImage: getVaporBoyLogo()
    });

    // Re-render every second for the debug menu
    const debugMenuUpdate = () => {
      if (this.isMounted) {
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

    this.isMounted = false;
  }

  handleWasmBoyIsPlayingChange() {
    // TODO: Remove setTimeout hack for
    // WasmBoy.isPlaying once this is fixed:
    // https://github.com/torch2424/wasmboy/issues/292
    setTimeout(() => {
      const pauseOverlay = document.querySelector(
        ".wasmboy-canvas__pause-overlay"
      );

      if (WasmBoy.isLoadedAndStarted() && WasmBoy.isPlaying()) {
        pauseOverlay.classList.add("wasmboy-canvas__pause-overlay--hidden");
      } else {
        pauseOverlay.classList.remove("wasmboy-canvas__pause-overlay--hidden");
      }
    }, 50);
  }

  configWasmBoy(canvasElement) {
    const wasmBoyConfigTask = async () => {
      const vaporboyOptions = {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY)
      };
      // Done grab vaporboyEffects here,
      // As we need it to be grabbed in the callbacks
      // To be updated as needed

      if (Pubx.get(PUBX_CONFIG.VAPORBOY_EFFECTS_KEY).vapor) {
        vaporboyOptions.gameboyFrameRate = Math.floor(
          vaporboyOptions.gameboyFrameRate * 0.875
        );
      }

      const wasmboyConfig = {
        ...vaporboyOptions,
        onPlay: () => {
          this.handleWasmBoyIsPlayingChange();
        },
        onPause: () => {
          this.handleWasmBoyIsPlayingChange();
        },
        saveStateCallback: saveStateObject => {
          // Fire off analytics ping, for session length
          if (window !== undefined && window.gtag) {
            gtag("event", "save_state_callback");
          }

          // Function called everytime a savestate occurs
          // Used by the WasmBoySystemControls to show screenshots on save states
          if (WasmBoy.getCanvas()) {
            saveStateObject.screenshotCanvasDataURL = WasmBoy.getCanvas().toDataURL();
          }

          // Tag our save state with the vaporboy version
          saveStateObject.vaporBoyVersion = packageJson.version;
        },
        updateAudioCallback: (audioContext, audioBufferSourceNode) => {
          // Chain connect the audio nodes
          let audioNode = audioBufferSourceNode;

          const vaporboyEffects = {
            ...Pubx.get(PUBX_CONFIG.VAPORBOY_EFFECTS_KEY)
          };

          if (vaporboyEffects.vapor) {
            audioNode = vaporAudioEffect(audioContext, audioNode);
          }

          if (vaporboyEffects.bassBoost) {
            audioNode = bassBoostEffect(audioContext, audioNode);
          }

          return audioNode;
        },
        updateGraphicsCallback: imageDataArray => {
          const vaporboyEffects = {
            ...Pubx.get(PUBX_CONFIG.VAPORBOY_EFFECTS_KEY)
          };

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
              <div>⚙️ > 🎮 Select a ROM</div>
            ) : (
              <div>🖥️ Start > 🎮 Select a ROM</div>
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
        <div class="wasmboy-canvas__pause-overlay wasmboy-canvas__pause-overlay--hidden">
          Paused ⏸️
        </div>;
      </div>
    );
  }
}
