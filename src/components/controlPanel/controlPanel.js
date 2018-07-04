import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

import {
  CONTROL_PANEL_VIEWS,
  getControlPanelSelectView,
  getROMSourceSelectorView,
  getMyCollectionView,
  getHomebrewView,
  getLoadStateListView,
  getOptionsView
} from "./controlPanelViews";

import { ROMCollection } from "../../services/ROMCollection";

export default class ControlPanel extends Component {
  constructor() {
    super();

    // Define our control panel pubx state
    const pubxControlPanelState = {
      show: false,
      rootView: false,
      viewStack: [],
      hide: () => {
        Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, {
          rootView: false,
          viewStack: []
        });
      }
    };

    // Send to pubx
    Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, pubxControlPanelState);

    // Subscribe to changes
    const pubxSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.CONTROL_PANEL_KEY,
      newState => {
        // You can spread and overwrite variables, while preserving ones,
        // as long is in cascading order.
        this.setState({
          ...this.state,
          ...newState
        });
      }
    );

    this.setState({
      ...pubxControlPanelState,
      pubxSubscriberKey
    });

    // Finally update our collection, for save states and the rom collection
    this.updateCollection();
  }

  updateCollection() {
    // Get the current ROM Collection
    const getCollectionTask = async () => {
      const collection = await ROMCollection.getCollection();
      Pubx.publish(PUBX_CONFIG.ROM_COLLECTION_KEY, {
        collection
      });
    };

    // Get the current rom save states
    const getSaveStatesTask = async () => {
      if (!WasmBoy.isReady()) {
        return;
      }

      WasmBoy.getSaveStates()
        .then(saveStates => {
          Pubx.publish(PUBX_CONFIG.SAVES_STATES_KEY, {
            saveStates
          });
        })
        .catch(() => {
          // TODO:
        });
    };

    // Kick off our tasks
    getCollectionTask();
    getSaveStatesTask();
  }

  goToPreviousView() {
    this.state.viewStack.pop();
    this.setState({
      ...this.state
    });
  }

  render() {
    // Next, check if we do have a base component view in the props
    const baseComponent = this.getControlPanelBaseComponent();
    let currentView = baseComponent.view;
    let currentTitle = baseComponent.title;

    // Lastly, set the current view to the last item on the view stack
    if (this.state.viewStack.length > 0) {
      currentView = this.state.viewStack[this.state.viewStack.length - 1].view;
    }

    this.state.viewStack.forEach(view => {
      currentTitle += ` - ${view.title}`;
    });

    // Show a loader while we perform async tasks
    let renderedView = <div class="donut" />;
    if (this.state.collection) {
      renderedView = currentView;
    }

    return (
      <div
        className={
          this.props.show
            ? "control-panel control-panel--show"
            : "control-panel"
        }
      >
        <div class="control-panel__modal">
          <div class="aesthetic-windows-95-modal">
            <div class="aesthetic-windows-95-modal-title-bar">
              <div class="aesthetic-windows-95-modal-title-bar-text">
                {currentTitle}
              </div>

              <div class="aesthetic-windows-95-modal-title-bar-controls">
                <div class="aesthetic-windows-95-button-title-bar">
                  <button onclick={() => this.hide()}>X</button>
                </div>
              </div>
            </div>

            <div class="aesthetic-windows-95-modal-content">
              <div class="control-panel__modal__controls">
                <div class="aesthetic-windows-95-button">
                  <button
                    disabled={this.state.viewStack.length <= 0}
                    onclick={() => this.goToPreviousView()}
                  >
                    ⬅️
                  </button>
                </div>
              </div>

              <hr />

              <div class="control-panel__modal__view">{renderedView}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
