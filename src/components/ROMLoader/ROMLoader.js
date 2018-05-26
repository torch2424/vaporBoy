import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import Cartridge from "./cartridge/cartridge";

export default class ROMLoader extends Component {
  constructor() {
    super();
    this.setState({
      viewMyCollection: false,
      viewOpenSource: false
    });
  }

  hideROMLoader() {
    this.props.show = false;
    this.setState({ ...this.state });
  }

  triggerLocalFileUpload() {
    document.getElementById("ROMFileInput").click();
  }

  loadLocalFile(event) {
    const loadFileTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(event.target.files[0]);
      console.log("Wasmboy Ready!");
      await WasmBoy.play();
    };

    loadFileTask();
  }

  render() {
    return (
      <div
        className={this.props.show ? "ROMLoader ROMLoader--show" : "ROMLoader"}
      >
        {/*Our Hidden Input for uploading files*/}
        <input
          type="file"
          id="ROMFileInput"
          class="hidden"
          accept=".gb, .gbc, .zip"
          onChange={event => {
            this.loadLocalFile(event);
          }}
        />

        {/* Our initial screen */}
        <h1>ROM Loader</h1>
        <button onClick={() => this.hideROMLoader()}>Close</button>

        <ul class="initial-load-row">
          <li class="initial-load-row__item">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z" />
              </svg>
              <div class="initial-load-row__item__label">My Collection</div>
            </button>
            <div class="initial-load-row__item__count" />
          </li>
          <li class="initial-load-row__item" />
          <li class="initial-load-row__item" />
        </ul>
      </div>
    );
  }
}
