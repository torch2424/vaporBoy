import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";
import { ROMCollection } from "../../../services/ROMCollection";

import { AVAILABLE_GAMES } from "../homebrew/availableGames";

import MyCollection from "../myCollection/myCollection";
import Homebrew from "../homebrew/homebrew";

export default class ROMSourceSelector extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    // Get our pubx states
    const pubxCollectionState = Pubx.get(PUBX_CONFIG.ROM_COLLECTION_KEY);
    const pubxControlPanelState = Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY);
    const pubxInfoModalState = Pubx.get(PUBX_CONFIG.INFO_MODAL_KEY);

    this.setState({
      collection: {
        ...pubxCollectionState
      },
      controlPanel: {
        ...pubxControlPanelState
      },
      infoModal: {
        ...pubxInfoModalState
      }
    });

    // Subscribe to our collection state
    Pubx.subscribe(PUBX_CONFIG.ROM_COLLECTION_KEY, newState => {
      this.setState({
        ...this.state,
        collection: {
          ...this.state.colleciton,
          ...newState
        }
      });
    });
  }

  triggerLocalFileUpload() {
    document.getElementById("ROMFileInput").click();
  }

  loadLocalFile(event) {
    const loadFileTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(event.target.files[0]);
      await WasmBoy.play();
      this.state.controlPanel.hideControlPanel();
      await ROMCollection.saveCurrentWasmBoyROMToCollection();
      ROMCollection.updateCollection();
    };

    loadFileTask();
  }

  viewMyCollection() {
    this.state.controlPanel.addComponentToControlPanelViewStack(
      "My Collection",
      <MyCollection />
    );
  }

  viewHomebrew() {
    this.state.controlPanel.addComponentToControlPanelViewStack(
      "Homebrew",
      <Homebrew />
    );
  }

  uploadRomInfoModal() {
    this.state.infoModal.showInfoModal(
      "Help - Uploading Roms",
      <div>
        Uploaded ROMs will automatically be stored in "My Collection" for
        offline playing using IndexedDb.
      </div>
    );
  }

  render() {
    // Number of roms in our collection
    let numberOfROMsInCollection = 0;
    if (this.state.collection && this.state.collection.collection) {
      numberOfROMsInCollection = Object.keys(this.state.collection.collection)
        .length;
    }

    // Number of Open Source Games
    let numberOfHomebrew = AVAILABLE_GAMES.length;

    // Our buttons for selecting the source
    let sourceOptions = (
      <ul class="ROMSourceSelector__list">
        <li class="ROMSourceSelector__list__item">
          <button
            onClick={() => {
              this.viewMyCollection();
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
              this.viewHomebrew();
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
          <button
            class="ROMSourceSelector__list__item__tooltip"
            onClick={() => this.uploadRomInfoModal()}
          >
            i
          </button>
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
