import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";
import { ROMCollection } from "../../../services/ROMCollection";

import { NOTIFICATION_MESSAGES } from "../../../notification.messages";

import { AVAILABLE_GAMES } from "../homebrew/availableGames";

import MyCollection from "../myCollection/myCollection";
import Homebrew from "../homebrew/homebrew";
import ROMScraper from "../ROMScraper/ROMScraper";
import GooglePicker from "../../googlePicker/googlePicker";

// Public Keys for Google Drive API
const VAPORBOY_GOOGLE_PICKER_CLIENT_ID =
  "855439246509-cado3d9ua6vs6d9dqqjlt7e9cfiss0nn.apps.googleusercontent.com";
let googlePickerOAuthToken = "";

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

  askToAddROMToCollection(ROMName) {
    this.state.confirmationModal.showConfirmationModal({
      title: "Add ROM To My Collection?",
      contentElement: (
        <div>
          Would you like to add this ROM to your collection? It will save the
          ROM in your browser storage, and allow you to scrape/input information
          about the ROM.
        </div>
      ),
      confirmCallback: () => {
        // If Confirm, show the rom scraper
        // Clear the view stack, and add our ROM Scraper
        Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, {
          viewStack: [
            {
              title: `ROM Scraper - ${ROMName}`,
              view: <ROMScraper />
            }
          ],
          required: true
        });

        if (window !== undefined && window.gtag) {
          gtag("event", "scraper_show");
        }
      },
      cancelCallback: () => {
        const playROMTask = async () => {
          await WasmBoy.play();

          Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
            NOTIFICATION_MESSAGES.LOAD_ROM
          );
          this.state.controlPanel.hideControlPanel();

          if (window !== undefined && window.gtag) {
            gtag("event", "scraper_skip");
          }
        };
        const playROMPromise = playROMTask();
        playROMPromise.catch(error => {
          console.error(error);
          Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
            NOTIFICATION_MESSAGES.ERROR_LOAD_ROM
          );
        });
        Pubx.get(PUBX_CONFIG.LOADING_KEY).addPromiseToStack(playROMPromise);
      },
      cancelText: "Skip"
    });
  }

  loadLocalFile(event) {
    if(!event.target.files[0].name.endsWith(".zip") &&
    !event.target.files[0].name.endsWith(".gb") &&
    !event.target.files[0].name.endsWith(".gbc")) {
      this.state.confirmationModal.showConfirmationModal({
        title: "Fail - " + event.target.files[0].name,
        contentElement: (
          <div>
            Uploaded ROM had a unknown filetype. Confirm it is correct.
          </div>
        )
      });

      return;
    }
  
    const loadROMTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(event.target.files[0]);

      // Ask if you would like to add to my collection
      this.askToAddROMToCollection(event.target.files[0].name);
    };
    Pubx.get(PUBX_CONFIG.LOADING_KEY).addPromiseToStack(loadROMTask());
  }

  loadGoogleDriveFile(data) {
    const loadGoogleDriveFilePromise = new Promise((resolve, reject) => {
      // We only want the picked action
      if (data.action !== "picked") {
        resolve();
        return;
      }

      // Fetch from the drive api to download the file
      // https://developers.google.com/drive/v3/web/picker
      // https://developers.google.com/drive/v2/reference/files/get

      const googlePickerFileObject = data.docs[0];
      const oAuthHeaders = new Headers({
        Authorization: "Bearer " + googlePickerOAuthToken
      });

      // First Fetch the Information about the file
      fetch(
        "https://www.googleapis.com/drive/v2/files/" +
          googlePickerFileObject.id,
        {
          headers: oAuthHeaders
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          if (
            responseJson.title.endsWith(".zip") ||
            responseJson.title.endsWith(".gb") ||
            responseJson.title.endsWith(".gbc")
          ) {
            WasmBoy.pause()
              .then(() => {
                // Finally load the file using the oAuthHeaders
                WasmBoy.loadROM(responseJson.downloadUrl, {
                  headers: oAuthHeaders,
                  fileName: responseJson.title
                })
                  .then(() => {
                    this.askToAddROMToCollection(responseJson.title);
                    resolve();
                  })
                  .catch(error => {
                    console.error("Load Game Error:", error);
                    Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
                      NOTIFICATION_MESSAGES.ERROR_LOAD_ROM
                    );
                    reject();
                  });
              })
              .catch(error => {
                console.error(error);
                Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
                  NOTIFICATION_MESSAGES.ERROR_LOAD_ROM
                );
                reject();
              });
          } else {
            this.props.showNotification("Invalid file type. 😞");
            Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
              NOTIFICATION_MESSAGES.ERROR_FILE_TYPE
            );
            reject();
          }
        })
        .catch(error => {
          console.error(error);
          Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
            NOTIFICATION_MESSAGES.ERROR_GOOGLE_DRIVE
          );
          reject();
        });
    });
    Pubx.get(PUBX_CONFIG.LOADING_KEY).addPromiseToStack(
      loadGoogleDriveFilePromise
    );

    if (window !== undefined && window.gtag) {
      gtag("event", "google_drive_load");
    }
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
          Uploaded ROMs can be stored in "My Collection" for offline playing
          using IndexedDb.
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
            disabled={numberOfROMsInCollection <= 0}
            aria-label={`My Collection - ${numberOfROMsInCollection} ROMs`}
          >
            <div class="ROMSourceSelector__list__item__icon">📚</div>

            <div class="ROMSourceSelector__list__item__label">
              My Collection
            </div>
          </button>
          <div class="list-button">{numberOfROMsInCollection}</div>
        </li>
        <li class="ROMSourceSelector__list__item">
          <button
            onClick={() => {
              this.viewHomebrew();
            }}
            aria-label={`Homebrew - ${numberOfHomebrew} ROMs`}
          >
            <div class="ROMSourceSelector__list__item__icon">🍺</div>

            <div class="ROMSourceSelector__list__item__label">
              Homebrew ROMs
            </div>
          </button>
          <div class="list-button">{numberOfHomebrew}</div>
        </li>
        <li class="ROMSourceSelector__list__item">
          <button
            onClick={() => this.triggerLocalFileUpload()}
            aria-label="Open ROM from device"
          >
            <div class="ROMSourceSelector__list__item__icon">⬆️</div>

            <div class="ROMSourceSelector__list__item__label">
              Open from device
            </div>
          </button>
          <button
            class="list-button--info"
            onClick={() => this.uploadRomConfirmationModal()}
            aria-label="Information about Open ROM from device"
          >
            i
          </button>
        </li>
        <li class="ROMSourceSelector__list__item">
          {/* mimeTypes, application/zip = .zip, application/octetstream = .gb,.gbc*/}
          <GooglePicker
            clientId={VAPORBOY_GOOGLE_PICKER_CLIENT_ID}
            scope={["https://www.googleapis.com/auth/drive.readonly"]}
            onChange={data => {
              this.loadGoogleDriveFile(data);
            }}
            onAuthenticate={token => {
              googlePickerOAuthToken = token;
            }}
            multiselect={false}
            navHidden={true}
            authImmediate={false}
            mimeTypes={["application/zip", "application/octet-stream"]}
            viewId={"DOCS"}
          >
            <button aria-label="Open from Google Drive">
              <div class="ROMSourceSelector__list__item__icon">☁️</div>

              <div class="ROMSourceSelector__list__item__label">
                Google Drive
              </div>
            </button>
          </GooglePicker>
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
          accept="*"
          value={undefined}
          onChange={event => {
            this.loadLocalFile(event);
          }}
        />
        {sourceOptions}
      </div>
    );
  }
}
