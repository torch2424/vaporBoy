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
    // Number of roms in our collection
    let numberOfROMsInCollection = 0;

    // Number of Open Source Games
    let numberOfOpenSourceGames = 1;

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

        <button class="ROMLoader__close" onClick={() => this.hideROMLoader()}>
          X
        </button>

        <ul class="ROMLoader__initial-load-row">
          <li class="ROMLoader__initial-load-row__item">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z" />
              </svg>
              <div class="ROMLoader__initial-load-row__item__label">
                My Collection
              </div>
            </button>
            <div class="ROMLoader__initial-load-row__item__count">
              {numberOfROMsInCollection}
            </div>
          </li>
          <li class="ROMLoader__initial-load-row__item">
            <button onClick={() => this.triggerLocalFileUpload()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z" />
              </svg>
              <div class="ROMLoader__initial-load-row__item__label">
                Open from device
              </div>
            </button>
            <div
              class="ROMLoader__initial-load-row__item__tooltip"
              data-tooltip="Uploaded ROMs will automatically be stored in &quot;My Collection&quot; using IndexedDb"
            >
              i
            </div>
          </li>
          <li class="ROMLoader__initial-load-row__item">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z" />
              </svg>
              <div class="ROMLoader__initial-load-row__item__label">
                Open Source ROMs
              </div>
            </button>
            <div class="ROMLoader__initial-load-row__item__count">
              {numberOfOpenSourceGames}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
