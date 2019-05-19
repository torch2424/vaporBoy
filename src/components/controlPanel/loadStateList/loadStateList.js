import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import { NOTIFICATION_MESSAGES } from "../../../notification.messages";

const packageJson = require("../../../../package.json");

export default class LoadStateList extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    this.setState({
      saveStates: {
        ...Pubx.get(PUBX_CONFIG.SAVES_STATES_KEY)
      },
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      }
    });
  }

  checkStateVersion(saveState) {
    
    // Get the version, either the one saved, or when we started
    // Saving the version
    const saveStateVersion = saveState.vaporBoyVersion || packageJson.legacyVersions[0];

    // First, check if we are at a matching version
    if (saveStateVersion === packageJson.version) {
      this.loadState(saveState);
      return;
    }

    Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY).showConfirmationModal({
      title: "⚠️ VaporBoy / Save State Version Mismatch ⚠️",
      contentElement: (
        <div>
          You are trying to open a save state made with VaporBoy version <b>{saveStateVersion}</b>.
          However, the current VaporBoy being used is <b>{packageJson.version}</b>.
          Loading this save state may no longer work with this version of VaporBoy.
          <b>If the save state loads correctly</b>, feel free to continue playing and create new save states. 
          But note, this can alter the ROM in unexpected ways, and cause bugs down the line.
          <b>If the save state loads incorrectly</b>, please try to open this save state again in a Legacy version of VaporBoy.
          Legacy Versions can be accessed from the <b>Control Panel > Legacy</b> menu.
          To go to the suggested legacy version directly, click the option below.
        </div>
      ),
      confirmCallback: () => {
        // If Confirm, load the state
        this.loadState(saveState)
      },
      confirmText: 'Load',
      cancelCallback: () => {

        // Find the version of the saveState in the legacy versions
        const legacyVersion = packageJson.legacyVersions[packageJson.legacyVersions.indexOf(saveStateVersion)];
        
        if (legacyVersion) {
          // Redirect to the legacy vaporby version
          window.location.pathname = `/legacy/vaporboy-${legacyVersion}/index.html`;
        } else {
          throw new Error('Could not find correct legacy version');
        }
      },
      cancelText: 'Legacy'
    });
  }

  loadState(saveState) {

    const loadStatePromise = new Promise((resolve, reject) => {
      WasmBoy.loadState(saveState)
        .then(() => {
          WasmBoy.play()
            .then(() => {
              this.state.controlPanel.hideControlPanel();
              Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
                NOTIFICATION_MESSAGES.LOAD_STATE
              );
              resolve();
            })
            .catch(error => {
              console.error(error);
              Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
                NOTIFICATION_MESSAGES.ERROR_RESUME_ROM
              );
              reject();
            });
        })
        .catch(error => {
          console.error(error);
          Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
            NOTIFICATION_MESSAGES.ERROR_LOAD_STATE
          );
          reject();
        });
    });

    Pubx.get(PUBX_CONFIG.LOADING_KEY).addPromiseToStack(loadStatePromise);
  }

  render() {
    const saveStates = [];
    if (this.state.saveStates && this.state.saveStates.saveStates) {
      // Sort our save states by newest
      this.state.saveStates.saveStates.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }

        if (a.date < b.date) {
          return 1;
        }

        return 0;
      });

      // Add them to our sae state DOM array
      this.state.saveStates.saveStates.forEach(saveState => {
        const saveStateDate = new Date(saveState.date);
        
        let saveStateVersionElement = (<div />);
        if (saveState.vaporBoyVersion) {
          saveStateVersionElement = (<div>VaporBoy Version: {saveState.vaporBoyVersion}</div>)
        }

        saveStates.push(
          <li>
            <button
              onClick={() => this.checkStateVersion(saveState)}
              aria-label={`Load Save State from ${saveStateDate.toLocaleString()}`}
            >
              <div>
                <img src={saveState.screenshotCanvasDataURL} />
              </div>
              <div>Date: {saveStateDate.toLocaleString()}</div>
              <div>isAuto: {saveState.isAuto.toString()}</div>
              {saveStateVersionElement}
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
