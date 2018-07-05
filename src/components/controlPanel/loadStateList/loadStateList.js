import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

export default class LoadStateList extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    // Get our pubx states
    const pubxSaveStatesState = Pubx.get(PUBX_CONFIG.SAVES_STATES_KEY);
    const pubxControlPanelState = Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY);

    this.setState({
      ...pubxSaveStatesState,
      ...pubxControlPanelState
    });
  }

  loadState(saveState) {
    WasmBoy.loadState(saveState)
      .then(() => {
        WasmBoy.play()
          .then(() => {
            // TODO:
            this.state.hideControlPanel();
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
    const saveStates = [];
    if (this.state.saveStates) {
      // Sort our save states by newest
      this.state.saveStates.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }

        if (a.date < b.date) {
          return 1;
        }

        return 0;
      });

      // Add them to our sae state DOM array
      this.state.saveStates.forEach(saveState => {
        const saveStateDate = new Date(saveState.date);
        saveStates.push(
          <li>
            <button onClick={() => this.loadState(saveState)}>
              <div>
                <img src={saveState.screenshotCanvasDataURL} />
              </div>
              <div>Date: {saveStateDate.toLocaleString()}</div>
              <div>isAuto: {saveState.isAuto.toString()}</div>
            </button>
          </li>
        );
      });
    }

    return (
      <div class="load-state-list">
        <ul>{saveStates}</ul>
      </div>
    );
  }
}
