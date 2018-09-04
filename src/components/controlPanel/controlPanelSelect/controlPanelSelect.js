import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import { NOTIFICATION_MESSAGES } from "../../../notification.messages";

import ROMSourceSelector from "../ROMSourceSelector/ROMSourceSelector";
import LoadStateList from "../loadStateList/loadStateList";
import VaporBoyOptions from "../vaporBoyOptions/vaporBoyOptions";
import VaporBoyEffects from "../vaporBoyEffects/vaporBoyEffects";
import About from "../about/about";
import Install from "../install/install";

export default class ControlPanelSelect extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // Subscribe to our save states for enabling/disabling loading
    const pubxSaveStatesSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.SAVES_STATES_KEY,
      newState => {
        this.setState({
          ...this.state,
          saveStates: {
            ...this.state.saveStates,
            ...newState
          }
        });
      }
    );

    this.setState({
      collection: {
        ...Pubx.get(PUBX_CONFIG.ROM_COLLECTION_KEY)
      },
      saveStates: {
        ...Pubx.get(PUBX_CONFIG.SAVES_STATES_KEY)
      },
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      },
      pubxSaveStatesSubscriberKey
    });
  }

  componentWillUnmount() {
    // unsubscribe from the state
    Pubx.unsubscribe(
      PUBX_CONFIG.SAVES_STATES_KEY,
      this.state.pubxSaveStatesSubscriberKey
    );
  }

  shouldDisableLoadStates() {
    if (!WasmBoy.isReady()) {
      return true;
    }

    if (!this.state.saveStates || !this.state.saveStates.saveStates) {
      return true;
    }

    return false;
  }

  saveState() {
    WasmBoy.saveState()
      .then(() => {
        WasmBoy.play()
          .then(() => {
            this.state.controlPanel.hideControlPanel();
            Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
              NOTIFICATION_MESSAGES.SAVE_STATE
            );
          })
          .catch(() => {
            Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
              `${NOTIFICATION_MESSAGES.SAVE_STATE} ${
                NOTIFICATION_MESSAGES.ERROR_RESUME_ROM
              }`
            );
          });
      })
      .catch(() => {
        Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
          NOTIFICATION_MESSAGES.ERROR_SAVE_STATE
        );
      });
  }

  viewROMSourceSelector() {
    this.state.controlPanel.addComponentToControlPanelViewStack(
      "ROM Source",
      <ROMSourceSelector />
    );
  }

  viewLoadStateList() {
    this.state.controlPanel.addComponentToControlPanelViewStack(
      "Load State",
      <LoadStateList />
    );
  }

  viewOptions() {
    this.state.controlPanel.addComponentToControlPanelViewStack(
      "Options",
      <VaporBoyOptions />
    );
  }

  viewEffects() {
    this.state.controlPanel.addComponentToControlPanelViewStack(
      "Effects",
      <VaporBoyEffects />
    );
  }

  viewAbout() {
    this.state.controlPanel.addComponentToControlPanelViewStack(
      "About",
      <About />
    );
  }

  viewInstall() {
    this.state.controlPanel.addComponentToControlPanelViewStack(
      "Install",
      <Install />
    );
  }

  playROM() {
    WasmBoy.play();
    this.state.controlPanel.hideControlPanel();
    Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
      NOTIFICATION_MESSAGES.RESUME_ROM
    );
  }

  pauseROM() {
    WasmBoy.pause();
    this.state.controlPanel.hideControlPanel();
    Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
      NOTIFICATION_MESSAGES.PAUSE_ROM
    );
  }

  render() {
    let playPause = (
      <button
        onclick={() => this.playROM()}
        disabled={!WasmBoy.isReady()}
        aria-label="Resume Playing"
      >
        <div>▶️</div>
        <div>Resume Playing</div>
      </button>
    );
    if (WasmBoy.isPlaying()) {
      playPause = (
        <button
          onclick={() => this.pauseROM()}
          disabled={!WasmBoy.isReady()}
          aria-label="Pause ROM"
        >
          <div>⏸️</div>
          <div>Pause ROM</div>
        </button>
      );
    }

    // Also check if we should show PWA Install
    let install = "";
    // This will show if you are in the PWA view
    // https://stackoverflow.com/questions/41742390/javascript-to-check-if-pwa-or-mobile-web
    if (!window.matchMedia("(display-mode: standalone)").matches) {
      install = (
        <button onclick={() => this.viewInstall()} aria-label="Install">
          <div>⬇️</div>
          <div>Install</div>
        </button>
      );
    }

    return (
      <div class="control-panel-select">
        <ul class="control-panel-select__grid">
          <li class="control-panel-select__grid__item">
            <button
              onclick={() => this.viewROMSourceSelector()}
              aria-label="Select a ROM"
            >
              <div>🎮</div>
              <div>Select a ROM</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">
            <button
              onclick={() => this.saveState()}
              disabled={!WasmBoy.isReady()}
              aria-label="Save State for current loaded ROM"
            >
              <div>💾</div>
              <div>Save State</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">
            <button
              onclick={() => this.viewLoadStateList()}
              disabled={this.shouldDisableLoadStates()}
              aria-label="Load State for current loaded ROM"
            >
              <div>📂</div>
              <div>Load State</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">
            <button
              onclick={() => this.viewOptions()}
              aria-label="Configure Options"
            >
              <div>⚙️</div>
              <div>Configure Options</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">
            <button
              onclick={() => this.viewEffects()}
              aria-label="Configure Effects"
            >
              <div>✨</div>
              <div>Configure Effects</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">{playPause}</li>
          <li class="control-panel-select__grid__item">
            <button onclick={() => this.viewAbout()} aria-label="About">
              <div>ℹ️</div>
              <div>About</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">{install}</li>
        </ul>
      </div>
    );
  }
}
