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
    // Subscribe to our collection state
    const pubxRomCollectionSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.ROM_COLLECTION_KEY,
      newState => {
        this.setState({
          ...this.state,
          collection: {
            ...this.state.colleciton,
            ...newState
          }
        });
      }
    );

    this.setState({
      collection: {
        ...Pubx.get(PUBX_CONFIG.ROM_COLLECTION_KEY)
      },
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      },
      confirmationModal: {
        ...Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY)
      },
      pubxRomCollectionSubscriberKey
    });
  }

  componentWillUnmount() {
    Pubx.unsubscribe(
      PUBX_CONFIG.ROM_COLLECTION_KEY,
      this.state.pubxRomCollectionSubscriberKey
    );
  }

  triggerLocalFileUpload() {
    document.getElementById("ROMFileInput").click();
  }

  loadLocalFile(event) {
    const loadROMTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(event.target.files[0]);

      // Ask if you would like to add to my collection
      this.state.confirmationModal.showConfirmationModal({
        title: "Add ROM To My Collection?",
        contentElement: (
          <div>
            Would you like to add this ROM to your collection? It will save the
            ROM in your browser storage, and allow you to scrape information
            about the ROM.
          </div>
        ),
        confirmCallback: () => {
          // If Confirm, show the rom scraper
        },
        cancelCallback: () => {
          // If Cancel, simply play the ROM
          const playROMTask = async () => {
            await WasmBoy.play();
            this.state.controlPanel.hideControlPanel();
          };
          playROMTask();
        },
        cancelText: "Skip"
      });
    };
    loadROMTask();
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

  uploadRomConfirmationModal() {
    this.state.confirmationModal.showConfirmationModal({
      title: "Help - Uploading Roms",
      contentElement: (
        <div>
          Uploaded ROMs will automatically be stored in "My Collection" for
          offline playing using IndexedDb.
        </div>
      )
    });
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
            onClick={() => this.uploadRomConfirmationModal()}
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
