import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import {
  VAPORBOY_OPTIONS_LOCALSTORAGE_KEY,
  VAPORBOY_DEFAULT_OPTIONS
} from "../../../vaporboyOptions.config";
import { VAPORBOY_OPTION_SECTIONS } from "./vaporBoyOptions.sections";

export default class VaporBoyOptions extends Component {
  constructor() {
    super();
    this.setState({
      stored: {},
      current: {},
      enableApplyButton: false
    });
  }

  componentDidMount() {
    // Subscribe to options changes
    const pubxVaporBoyOptionsSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.VAPORBOY_OPTIONS_KEY,
      newState => {
        this.setState({
          ...this.state,
          stored: {
            ...newState
          },
          current: {
            ...newState
          }
        });
      }
    );

    this.setState({
      ...this.state,
      stored: {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY)
      },
      current: {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY)
      },
      confirmationModal: {
        ...Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY)
      },
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      },
      pubxVaporBoyOptionsSubscriberKey
    });
  }

  componentWillUnmount() {
    Pubx.unsubscribe(
      PUBX_CONFIG.VAPORBOY_OPTIONS_KEY,
      this.state.pubxVaporBoyOptionsSubscriberKey
    );
  }

  updateOption(event, optionKey, option) {
    const current = {
      ...this.state.current
    };

    if (option.type === "integer") {
      current[optionKey] = parseInt(event.target.value, 10);
    } else if (option.type === "boolean") {
      current[optionKey] = event.target.checked;
    }

    this.setState({
      ...this.state,
      current: {
        ...current
      }
    });
  }

  showOptionInfo(option) {
    this.state.confirmationModal.showConfirmationModal(
      option.name,
      option.descriptionElement
    );
  }

  confirmReset() {
    Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY).showConfirmationModal(
      "Reset to Default options",
      <div>
        Are you sure you would like to reset to the Default Vaporboy Options?
      </div>,
      () => {
        // If confirm, reset

        // Save the state
        const resetOptionsTask = async () => {
          if (WasmBoy.isReady()) {
            await WasmBoy.saveState();
          }

          window.localStorage.setItem(
            VAPORBOY_OPTIONS_LOCALSTORAGE_KEY,
            JSON.stringify(VAPORBOY_DEFAULT_OPTIONS)
          );
          Pubx.publish(
            PUBX_CONFIG.VAPORBOY_OPTIONS_KEY,
            VAPORBOY_DEFAULT_OPTIONS
          );
          this.state.controlPanel.hideControlPanel();
        };

        // Run the task
        resetOptionsTask();
      }
    );
  }

  confirmApply() {
    Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY).showConfirmationModal(
      "Apply Options",
      <div>
        This will reset any currently running ROM. A save state will be made.
        Apply options?
      </div>,
      () => {
        // If confirm, apply

        const applyOptionsTask = async () => {
          if (WasmBoy.isReady()) {
            await WasmBoy.saveState();
          }

          window.localStorage.setItem(
            VAPORBOY_OPTIONS_LOCALSTORAGE_KEY,
            JSON.stringify(this.state.current)
          );
          Pubx.publish(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY, this.state.current);
          this.state.controlPanel.hideControlPanel();
        };

        // Run the task
        applyOptionsTask();
      }
    );
  }

  render() {
    const optionsSections = [];
    Object.keys(VAPORBOY_OPTION_SECTIONS).forEach(sectionKey => {
      // Get our section
      const section = VAPORBOY_OPTION_SECTIONS[sectionKey];

      optionsSections.push(
        <div class="vaporboy-options__section-header">
          <h3 class="vaporboy-options__section-header__title">
            {section.name}
          </h3>
          <div class="vaporboy-options__section-header__description">
            {section.descriptionElement}
          </div>
        </div>
      );

      Object.keys(section.options).forEach(optionKey => {
        // Get our option
        const option = section.options[optionKey];

        let optionElement;
        if (option.type === "boolean") {
          optionElement = (
            <li class="vaporboy-options__option">
              <label class="aesthetic-windows-95-checkbox">
                {option.name}
                <input
                  type="checkbox"
                  checked={this.state.current[optionKey]}
                  onChange={event =>
                    this.updateOption(event, optionKey, option)
                  }
                />
                <span class="aesthetic-windows-95-checkmark" />
              </label>

              <div class="vaporboy-options__option__description-element">
                {option.descriptionElement}
              </div>
            </li>
          );
        } else if (option.type === "integer") {
          optionElement = (
            <li class="vaporboy-options__option">
              <input
                class="aesthetic-windows-95-text-input"
                type="number"
                min={option.min}
                max={option.max}
                value={this.state.current[optionKey]}
                onChange={event => this.updateOption(event, optionKey, option)}
              />
              <div class="vaporboy-options__option__name">{option.name}</div>

              <div class="vaporboy-options__option__description-element">
                {option.descriptionElement}
              </div>
            </li>
          );
        }

        // Finally push the option element if we have one
        if (optionElement) {
          optionsSections.push(optionElement);
        }
      });
    });

    return (
      <div class="vaporboy-options">
        <ul>{optionsSections}</ul>
        <div class="vaporboy-options__apply-options">
          <div class="aesthetic-windows-95-button">
            <button onClick={() => this.confirmReset()}>
              Reset to default options
            </button>
          </div>
          <div class="aesthetic-windows-95-button">
            <button onClick={() => this.confirmApply()}>Apply</button>
          </div>
        </div>
      </div>
    );
  }
}
