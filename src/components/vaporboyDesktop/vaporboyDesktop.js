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

import ROMSourceSelector from "../controlPanel/ROMSourceSelector/ROMSourceSelector";
import VaporBoyOptions from "../controlPanel/vaporBoyOptions/vaporBoyOptions";
import VaporBoyEffects from "../controlPanel/vaporBoyEffects/vaporBoyEffects";
import About from "../controlPanel/about/about";
import Install from "../controlPanel/install/install";

export default class VaporBoyDesktop extends Component {
  componentDidMount() {
    // Bind our Pubx to state
    this.setState({
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      },
      taskBarActive: false
    });

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

  goToControlPanelView(name, component) {
    this.showControlPanel();

    this.state.controlPanel.addComponentToControlPanelViewStack(
      name,
      component
    );
  }

  toggleExpand() {
    const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);

    Pubx.publish(PUBX_CONFIG.LAYOUT_KEY, {
      expanded: !pubxLayoutState.expanded
    });
  }

  render() {
    return (
      <div class="vaporboy-desktop">

        {/* Main Desktop Area */}
        <div class="vaporboy-desktop__main">

          <div class="vaporboy-desktop__main__shortcuts">
            <ul>
              <li>
                <div class="vaporboy-desktop__main__shortcuts__icon">
                  <img src={getVaporBoyLogo()} />
                </div>
                <div class="vaporboy-desktop__main__shortcuts__text">My Vaporboy</div>
              </li>

              <li>
                <div class="vaporboy-desktop__main__shortcuts__icon">
                  🗑️
                </div>
                <div class="vaporboy-desktop__main__shortcuts__text">Recycle Bin</div>
              </li>

              <li>
                <div class="vaporboy-desktop__main__shortcuts__icon">
                  🌐
                </div>
                <div class="vaporboy-desktop__main__shortcuts__text">Surf the Web</div>
              </li>

              <li>
                <div class="vaporboy-desktop__main__shortcuts__icon">
                  ⚡
                </div>
                <div class="vaporboy-desktop__main__shortcuts__text">VinAMP</div>
              </li>

              <li>
                <div class="vaporboy-desktop__main__shortcuts__icon">
                  ⚔️
                </div>
                <div class="vaporboy-desktop__main__shortcuts__text">A E S T H E T I C of Empires</div>
              </li>

              <li>
                <div class="vaporboy-desktop__main__shortcuts__icon">
                  🛹
                </div>
                <div class="vaporboy-desktop__main__shortcuts__text">Aaron Turner's Internet Skater 2</div>
              </li>

              <li>
                <div class="vaporboy-desktop__main__shortcuts__icon">
                  <img src="assets/levelcar.png" />
                </div>
                <div class="vaporboy-desktop__main__shortcuts__text">Get  Dis  Money</div>
              </li>


            </ul>
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
                    <button class="vaporboy-desktop__expand" onClick={() => this.toggleExpand()}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                        />
                      </svg>
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
              <button onClick={() => this.showControlPanel()}>📝 Control Panel</button>
            </li>
            <li class="aesthetic-windows-95-taskbar-start-menu-item">
              <button onClick={() => this.goToControlPanelView("Select a ROM", <ROMSourceSelector />)}>🎮 Select a ROM</button>
            </li>
            <li class="aesthetic-windows-95-taskbar-start-menu-item">
              <button onClick={() => this.goToControlPanelView("Options", <VaporBoyOptions />)}>⚙️  Options</button>
            </li>
            <li class="aesthetic-windows-95-taskbar-start-menu-item">
              <button onClick={() => this.goToControlPanelView("Effects", <VaporBoyEffects />)}>✨ Effects</button>
            </li>
            <li class="aesthetic-windows-95-taskbar-start-menu-item">
              <button onClick={() => this.goToControlPanelView("About", <About />)}>ℹ️ About</button>
            </li>
            <li class="aesthetic-windows-95-taskbar-start-menu-item">
              <button onClick={() => this.goToControlPanelView("Install", <Install />)}>⬇️ Install</button>
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
