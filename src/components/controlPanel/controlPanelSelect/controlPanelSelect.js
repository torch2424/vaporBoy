import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import ROMSourceSelector from "../ROMSourceSelector/ROMSourceSelector";
import LoadStateList from "../loadStateList/loadStateList";
import VaporBoyOptions from "../vaporBoyOptions/vaporBoyOptions";

export default class ControlPanelSelect extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    // Get our pubx states
    const pubxCollectionState = Pubx.get(PUBX_CONFIG.ROM_COLLECTION_KEY);
    const pubxSaveStatesState = Pubx.get(PUBX_CONFIG.SAVES_STATES_KEY);
    const pubxControlPanelState = Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY);

    this.setState({
      ...pubxCollectionState,
      ...pubxSaveStatesState,
      ...pubxControlPanelState
    });
  }

  shouldDisableLoadStates() {
    if (!WasmBoy.isReady()) {
      return true;
    }

    if (!this.state.saveStates) {
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
            this.state.hide();
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
    this.state.addComponentToViewStack("ROM Source", <ROMSourceSelector />);
  }

  viewLoadStateList() {
    this.state.addComponentToViewStack("Load State", <LoadStateList />);
  }

  viewOptions() {
    this.state.addComponentToViewStack("Options", <VaporBoyOptions />);
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
        </ul>
      </div>
    );
  }
}
