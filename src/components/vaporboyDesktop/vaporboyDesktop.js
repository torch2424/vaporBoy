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
      taskBarActive: false
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

  openDropdown(event, stateKey) {
    event.stopPropagation();
    const state = {
      ...this.state
    };
    state[stateKey] = true;
    this.setState(state);
  }

  closeDropdowns() {
    this.setState({
      ...this.state,
      taskBarActive: false
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

        {/* Main Desktop Area */}
        <div class="vaporboy-desktop__main">

          <div class="vaporboy-desktop__main__shortcuts">
            <ul></ul>
          </div>

          <div class="vaporboy-desktop__main__window">

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
                  <div class="aesthetic-windows-95-button-title-bar">
                    <button>
                      X
                    </button>
                  </div>
                </div>
              </div>

              <div class="aesthetic-windows-95-modal-content vaporboy-desktop__main__window__game-container">
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


        {/* Bottom Taskbar */}
        <div class="aesthetic-windows-95-taskbar">

          <div class="aesthetic-windows-95-taskbar-start">
            <button onClick={(event) => this.openDropdown(event, 'taskBarActive')}>
              🖥️ Start            
            </button>
          </div>

          <ul class={`aesthetic-windows-95-taskbar-start-menu ${this.state.taskBarActive ? 'is-active' : ''}`}>
            <li class="aesthetic-windows-95-taskbar-start-menu-item">
              <button>Menu Item 1</button>
            </li>
            <li class="aesthetic-windows-95-taskbar-start-menu-item">
              <button>Menu Item 2</button>
            </li>
            <li class="aesthetic-windows-95-taskbar-start-menu-item">
              <button>Menu Item 3</button>
            </li>
          </ul>

          <div class="aesthetic-windows-95-taskbar-services">
            📶🔈🔔
          </div>
        </div>

      </div>
    );
  }
}
