import { Component } from "preact";
import { WasmBoy } from "wasmboy";

export default class LoadStateList extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {}

  loadState(saveState) {
    WasmBoy.loadState(saveState)
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
    const saveStates = [];
    if (this.props.saveStates) {
      // Sort our save states by newest
      this.props.saveStates.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }

        if (a.date < b.date) {
          return 1;
        }

        return 0;
      });

      // Add them to our sae state DOM array
      this.props.saveStates.forEach(saveState => {
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
