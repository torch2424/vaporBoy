// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

// Our Components
import SGBBorder from "./sgbBorder/sgbBorder";
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

// 3P libs
import * as screenfull from "screenfull";

export default class VaporBoyDesktop extends Component {
  componentDidMount() {
    // Bind our Pubx to state
    this.setState({
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      }
    });

    if (screenfull.enabled) {
      screenfull.on("change", () => {
        // Set the state to re-render and update our fullscreen icon
        this.setState({
          ...this.state
        });
      });
    }

    // Set HTML/Body BG color
    document.documentElement.classList.add("desktop");
  }

  componentWillUnmount() {
    document.documentElement.classList.remove("desktop");
  }

  resetWasmBoy() {
    const resetWasmBoyTask = async () => {
      await WasmBoy.reset();
      await WasmBoy.play();
    };

    resetWasmBoyTask();
  }

  showControlPanel() {
    Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, {
      show: true
    });
  }

  toggleExpand() {
    const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);

    Pubx.publish(PUBX_CONFIG.LAYOUT_KEY, {
      expanded: !pubxLayoutState.expanded
    });
  }

  render() {
    // Create our fullscreenButton
    let fullScreenButton = "";
    let fullScreenViewListItem = "";
    if (screenfull.enabled) {
      // Our full screen view button
      fullScreenViewListItem = (
        <li class="aesthetic-windows-95-dropdown-menu-item">
          <button
            onClick={() => {
              screenfull.toggle();
            }}
          >
            Toggle Fullscreen
          </button>
        </li>
      );

      // Full Screen Icon
      let fullScreenIcon = "";
      if (screenfull.isFullscreen) {
        fullScreenIcon = "_";
      }

      fullScreenButton = (
        <div class="aesthetic-windows-95-button-title-bar vaporboy-desktop__title-bar__fullscreen">
          <button
            onClick={() => {
              screenfull.toggle();
            }}
          >
            {fullScreenIcon}
          </button>
        </div>
      );
    }

    return (
      <div class="vaporboy-desktop">
        <div class="aesthetic-windows-95-modal">
          <div class="aesthetic-windows-95-modal-title-bar">
            <div class="aesthetic-windows-95-modal-title-bar-text">
              <img
                class="vaporboy-desktop__vaporboy-logo"
                src="assets/vaporboyvhs.png"
              />
              V A P O R B O Y
            </div>

            <div class="aesthetic-windows-95-modal-title-bar-controls">
              {fullScreenButton}
            </div>
          </div>

          <div class="aesthetic-windows-95-modal-content">
            {/* Drop Down Lists */}
            <div class="vaporboy-desktop__dropdowns">
              <div class="aesthetic-windows-95-dropdown">
                <button class="aesthetic-windows-95-dropdown-trigger">
                  File
                </button>
                <ul class="aesthetic-windows-95-dropdown-menu">
                  <li class="aesthetic-windows-95-dropdown-menu-item">
                    <button onClick={() => this.showControlPanel()}>
                      Control Panel
                    </button>
                  </li>

                  <hr />

                  <li class="aesthetic-windows-95-dropdown-menu-item">
                    <button onClick={() => this.resetWasmBoy()}>
                      Reset...
                    </button>
                  </li>
                </ul>
              </div>

              <div class="aesthetic-windows-95-dropdown">
                <button class="aesthetic-windows-95-dropdown-trigger">
                  View
                </button>
                <ul class="aesthetic-windows-95-dropdown-menu">
                  <li class="aesthetic-windows-95-dropdown-menu-item">
                    <button onClick={() => this.toggleExpand()}>
                      Expand Game
                    </button>
                  </li>
                  {fullScreenViewListItem}
                </ul>
              </div>
            </div>

            <hr />

            <div class="aesthetic-windows-95-container vaporboy-desktop__game-container">
              {/* Actual Game Content Here */}

              <div className="wasmboy-canvas-container">
                <WasmBoyCanvas />
              </div>
              <div className="sgb-border">
                <SGBBorder />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
