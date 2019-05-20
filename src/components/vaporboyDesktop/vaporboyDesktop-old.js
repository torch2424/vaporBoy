// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

// Our Components
import SGBBorder from "./sgbBorder/sgbBorder";
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

import { getVaporBoyLogo } from "../../vaporboyLogo";

import { NOTIFICATION_MESSAGES } from "../../notification.messages";

// 3P libs
import * as screenfull from "screenfull";

export default class VaporBoyDesktop extends Component {
  componentDidMount() {
    // Bind our Pubx to state
    this.setState({
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      },
      fileMenuActiveClass: "",
      viewMenuActiveClass: ""
    });

    if (screenfull.enabled) {
      screenfull.on("change", () => {
        // Set the state to re-render and update our fullscreen icon
        this.setState({
          ...this.state
        });
      });
    }

    document.addEventListener("click", () => {
      this.closeDropdowns();
    });
  }

  componentWillUnmount() {
    document.removeEventListener("click", () => {
      this.closeDropdowns();
    });
  }

  resetWasmBoy() {
    const resetWasmBoyTask = async () => {
      await WasmBoy.reset();
      await WasmBoy.play();

      Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
        NOTIFICATION_MESSAGES.RESET_ROM
      );
    };

    resetWasmBoyTask().catch(error => {
      console.error(error);
      Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
        NOTIFICATION_MESSAGES.ERROR_RESET_ROM
      );
    });
  }

  showControlPanel() {
    Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, {
      show: true
    });

    // Calling resume Audio Context here, as it is always used on desktop
    WasmBoy.resumeAudioContext();
  }

  toggleExpand() {
    const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);

    Pubx.publish(PUBX_CONFIG.LAYOUT_KEY, {
      expanded: !pubxLayoutState.expanded
    });
  }

  showDropdown(event, stateKey) {
    event.stopPropagation();
    this.closeDropdowns();
    const newState = {
      ...this.state
    };
    newState[stateKey] = "is-active";
    this.setState(newState);
  }

  closeDropdowns() {
    this.setState({
      ...this.state,
      fileMenuActiveClass: "",
      viewMenuActiveClass: ""
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
                src={getVaporBoyLogo()}
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
                <button
                  class="aesthetic-windows-95-dropdown-trigger"
                  onClick={event =>
                    this.showDropdown(event, "fileMenuActiveClass")
                  }
                >
                  File
                </button>
                <ul
                  class={`aesthetic-windows-95-dropdown-menu ${
                    this.state.fileMenuActiveClass
                  }`}
                >
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
                <button
                  class="aesthetic-windows-95-dropdown-trigger"
                  onClick={event =>
                    this.showDropdown(event, "viewMenuActiveClass")
                  }
                >
                  View
                </button>
                <ul
                  class={`aesthetic-windows-95-dropdown-menu ${
                    this.state.viewMenuActiveClass
                  }`}
                >
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
