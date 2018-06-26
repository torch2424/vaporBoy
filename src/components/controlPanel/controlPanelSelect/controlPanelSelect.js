import { Component } from "preact";
import { WasmBoy } from "wasmboy";

export default class ControlPanelSelect extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {}

  shouldDisableLoadStates() {
    if (!WasmBoy.isReady()) {
      return true;
    }

    if (!this.props.saveStates) {
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
            this.props.hide();
          })
          .catch(() => {
            // TODO:
          });
      })
      .catch(() => {
        // TODO:
      });
  }

  render() {
    return (
      <div class="control-panel-select">
        <ul class="control-panel-select__grid">
          <li class="control-panel-select__grid__item">
            <button onclick={() => this.props.viewROMSourceSelector()}>
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
              onclick={() => this.props.viewLoadStateList()}
              disabled={this.shouldDisableLoadStates()}
            >
              <div>📂</div>
              <div>Load State</div>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
