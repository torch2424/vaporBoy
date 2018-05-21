// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import SGBBorder from "../sgbBorder/sgbBorder";
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";

export default class VaporBoyDesktop extends Component {
  render() {
    return (
      <div class="vaporboy-desktop">
        <div class="aesthetic-windows-95-modal">
          <div class="aesthetic-windows-95-modal-title-bar">
            <div class="aesthetic-windows-95-modal-title-bar-text">
              vaporboy.net
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
                    <button>Menu Item 1</button>
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
                    <button>Expand Game</button>
                  </li>
                  <li class="aesthetic-windows-95-dropdown-menu-item">
                    <button>Fullscreen</button>
                  </li>
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
