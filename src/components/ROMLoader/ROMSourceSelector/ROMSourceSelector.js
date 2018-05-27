import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { AVAILABLE_GAMES } from "../homebrew/availableGames";

export default class ROMSourceSelector extends Component {
  constructor() {
    super();
    this.setState({});
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
    let numberOfHomebrew = AVAILABLE_GAMES.length;

    return (
      <div>
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

        <ul class="ROMSourceSelector">
          <li class="ROMSourceSelector__item">
            <button
              onClick={() => {
                this.props.viewMyCollection();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z" />
              </svg>
              <div class="ROMSourceSelector__item__label">My Collection</div>
            </button>
            <div class="ROMSourceSelector__item__count">
              {numberOfROMsInCollection}
            </div>
          </li>
          <li class="ROMSourceSelector__item">
            <button
              onClick={() => {
                this.props.viewHomebrew();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              <div class="ROMSourceSelector__item__label">Homebrew ROMs</div>
            </button>
            <div class="ROMSourceSelector__item__count">{numberOfHomebrew}</div>
          </li>
          <li class="ROMSourceSelector__item">
            <button onClick={() => this.triggerLocalFileUpload()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z" />
              </svg>
              <div class="ROMSourceSelector__item__label">Open from device</div>
            </button>
            <div
              class="ROMSourceSelector__item__tooltip"
              data-tooltip="Uploaded ROMs will automatically be stored in &quot;My Collection&quot; for offline playing using IndexedDb."
            >
              i
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
