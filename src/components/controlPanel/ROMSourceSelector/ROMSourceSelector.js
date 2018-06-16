import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { ROMCollection } from "../../../services/ROMCollection";

import { AVAILABLE_GAMES } from "../homebrew/availableGames";

export default class ROMSourceSelector extends Component {
  constructor() {
    super();
    this.setState({
      collection: false
    });
  }

  componentDidMount() {}

  triggerLocalFileUpload() {
    document.getElementById("ROMFileInput").click();
  }

  loadLocalFile(event) {
    const loadFileTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(event.target.files[0]);
      console.log("Wasmboy Ready!");
      await WasmBoy.play();
      await ROMCollection.saveCurrentWasmBoyROMToCollection();
      if (this.props.updateCollection) {
        this.props.updateCollection();
      }
    };

    loadFileTask();
  }

  render() {
    // Number of roms in our collection
    let numberOfROMsInCollection = 0;
    if (this.props.collection) {
      numberOfROMsInCollection = Object.keys(this.props.collection).length;
    }

    // Number of Open Source Games
    let numberOfHomebrew = AVAILABLE_GAMES.length;

    // Our buttons for selecting the source
    let sourceOptions = (
      <ul class="ROMSourceSelector__list">
        <li class="ROMSourceSelector__list__item">
          <button
            onClick={() => {
              this.props.viewMyCollection();
            }}
          >
            <div class="ROMSourceSelector__list__item__icon">📚</div>

            <div class="ROMSourceSelector__list__item__label">
              My Collection
            </div>
          </button>
          <div class="ROMSourceSelector__list__item__count">
            {numberOfROMsInCollection}
          </div>
        </li>
        <li class="ROMSourceSelector__list__item">
          <button
            onClick={() => {
              this.props.viewHomebrew();
            }}
          >
            <div class="ROMSourceSelector__list__item__icon">🍺</div>

            <div class="ROMSourceSelector__list__item__label">
              Homebrew ROMs
            </div>
          </button>
          <div class="ROMSourceSelector__list__item__count">
            {numberOfHomebrew}
          </div>
        </li>
        <li class="ROMSourceSelector__list__item">
          <button onClick={() => this.triggerLocalFileUpload()}>
            <div class="ROMSourceSelector__list__item__icon">⬆️</div>

            <div class="ROMSourceSelector__list__item__label">
              Open from device
            </div>
          </button>
          <div
            class="ROMSourceSelector__list__item__tooltip"
            data-tooltip="Uploaded ROMs will automatically be stored in &quot;My Collection&quot; for offline playing using IndexedDb."
          >
            i
          </div>
        </li>
      </ul>
    );

    return (
      <div class="ROMSourceSelector">
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
        {sourceOptions}
      </div>
    );
  }
}
