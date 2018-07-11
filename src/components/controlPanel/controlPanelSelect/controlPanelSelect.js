import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import ROMSourceSelector from "../ROMSourceSelector/ROMSourceSelector";
import LoadStateList from "../loadStateList/loadStateList";
import VaporBoyOptions from "../vaporBoyOptions/vaporBoyOptions";
import VaporBoyEffects from "../vaporBoyEffects/vaporBoyEffects";

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
            // TODO:
            this.state.controlPanel.hideControlPanel();
          })
          .catch(() => {
            // TODO:
          });
      })
      .catch(() => {
        // TODO:
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

  render() {
    return (
      <div class="control-panel-select">
        <ul class="control-panel-select__grid">
          <li class="control-panel-select__grid__item">
            <button onclick={() => this.viewROMSourceSelector()}>
              <div>🎮</div>
              <div>Select a ROM</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">
            <button
              onclick={() => this.saveState()}
              disabled={!WasmBoy.isReady()}
            >
              <div>💾</div>
              <div>Save State</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">
            <button
              onclick={() => this.viewLoadStateList()}
              disabled={this.shouldDisableLoadStates()}
            >
              <div>📂</div>
              <div>Load State</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">
            <button onclick={() => this.viewOptions()}>
              <div>⚙️</div>
              <div>Configure Options</div>
            </button>
          </li>
          <li class="control-panel-select__grid__item">
            <button onclick={() => this.viewEffects()}>
              <div>✨</div>
              <div>Configure Effects</div>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
