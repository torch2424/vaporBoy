import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

import { ROMCollection } from "../../services/ROMCollection";
import ControlPanelSelect from "./controlPanelSelect/controlPanelSelect";

export default class ControlPanel extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // Subscribe to changes
    const pubxControlPanelSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.CONTROL_PANEL_KEY,
      newState => {
        // Check if we are being shown/hidden
        if (
          !this.state.controlPanel ||
          (newState.show && newState.show !== this.state.controlPanel.show)
        ) {
          // Finally update our collection, for save states and the rom collection
          ROMCollection.updateCollection();
        }

        // You can spread and overwrite variables, while preserving ones,
        // as long is in cascading order.
        this.setState({
          ...this.state,
          controlPanel: {
            ...this.state.controlPanel,
            ...newState
          }
        });
      }
    );

    this.setState({
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      },
      pubxControlPanelSubscriberKey
    });
  }

  componentWillUnmount() {
    // unsubscribe from the state
    Pubx.unsubscribe(
      PUBX_CONFIG.CONTROL_PANEL_KEY,
      this.state.pubxControlPanelSubscriberKey
    );
  }

  componentDidUpdate() {
    // Focus on our text [a11y]
    const focusElement = document.querySelector(".control-panel__modal button");
    if (focusElement) {
      focusElement.focus();
    }
  }

  goToPreviousView() {
    const viewStack = this.state.controlPanel.viewStack;
    viewStack.pop();

    Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, {
      viewStack
    });
  }

  render() {
    if (!this.state.controlPanel || !this.state.controlPanel.show) {
      return <div />;
    }

    // Next, check if we do have a base component view in the props
    let currentView = <ControlPanelSelect />;
    let currentTitle = "Control Panel";

    // Lastly, set the current view to the last item on the view stack
    if (this.state.controlPanel.viewStack.length > 0) {
      currentView = this.state.controlPanel.viewStack[
        this.state.controlPanel.viewStack.length - 1
      ].view;
    }

    if (this.state.controlPanel.required) {
      currentTitle = this.state.controlPanel.viewStack[
        this.state.controlPanel.viewStack.length - 1
      ].title;
    } else {
      this.state.controlPanel.viewStack.forEach(view => {
        currentTitle += ` - ${view.title}`;
      });
    }

    return (
      <div class="control-panel">
        <div class="control-panel__modal">
          <div class="aesthetic-windows-95-modal">
            <div class="aesthetic-windows-95-modal-title-bar">
              <div class="aesthetic-windows-95-modal-title-bar-text">
                {currentTitle}
              </div>

              {this.state.controlPanel.required ? (
                ""
              ) : (
                <div class="aesthetic-windows-95-modal-title-bar-controls">
                  <div class="aesthetic-windows-95-button-title-bar">
                    <button
                      onclick={() => this.state.controlPanel.hideControlPanel()}
                      aria-label="close control panel"
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div class="aesthetic-windows-95-modal-content">
              {this.state.controlPanel.required ? (
                ""
              ) : (
                <div class="control-panel__modal__controls">
                  <div class="aesthetic-windows-95-button">
                    <button
                      disabled={
                        this.state.controlPanel.viewStack.length <= 0 ||
                        this.state.controlPanel.required
                      }
                      onclick={() => this.goToPreviousView()}
                      aria-label="go to previous control panel view"
                    >
                      ⬅️
                    </button>
                  </div>
                </div>
              )}

              <hr />

              <div
                class={
                  this.state.controlPanel.required
                    ? "control-panel__modal__view"
                    : "control-panel__modal__view control-panel__modal__view--contained"
                }
              >
                {currentView}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
