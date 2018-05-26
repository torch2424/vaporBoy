// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import SGBBorder from "./sgbBorder/sgbBorder";
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";

// 3P libs
import * as screenfull from "screenfull";

export default class VaporBoyDesktop extends Component {
  componentDidMount() {
    if (screenfull.enabled) {
      screenfull.on("change", () => {
        // Set the state to re-render and update our fullscreen icon
        this.setState();
      });
    }

    // Set HTML/Body BG color
    document.documentElement.classList.add("vaporboy-desktop-bg");
    document.body.classList.add("vaporboy-desktop-bg");
  }

  componentWillUnmount() {
    document.documentElement.classList.remove("vaporboy-desktop-bg");
    document.body.classList.remove("vaporboy-desktop-bg");
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
                    <button onClick={() => this.props.showROMLoader()}>
                      Load ROM...
                    </button>
                  </li>
                  <li class="aesthetic-windows-95-dropdown-menu-item">
                    <button>Menu Item 2</button>
                  </li>
                  <hr />
                  <li class="aesthetic-windows-95-dropdown-menu-item">
                    <button>Menu Item 3</button>
                  </li>
                </ul>
              </div>

              <div class="aesthetic-windows-95-dropdown">
                <button class="aesthetic-windows-95-dropdown-trigger">
                  View
                </button>
                <ul class="aesthetic-windows-95-dropdown-menu">
                  <li class="aesthetic-windows-95-dropdown-menu-item">
                    <button onClick={() => this.props.toggleExpand()}>
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

              <div className="wasmboy-canvas">
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
