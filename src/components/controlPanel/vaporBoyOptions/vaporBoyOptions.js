import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import {
  VAPORBOY_OPTIONS_KEY,
  VAPORBOY_DEFAULT_OPTIONS,
  WASMBOY_OPTION_SECTIONS
} from "./vaporBoyOptions.constants";

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
    // Get our info modal state
    const pubxConfirmationModalState = Pubx.get(
      PUBX_CONFIG.CONFIRMATION_MODAL_KEY
    );

    // Grab our options from localstorage
    let vaporBoyOptions = JSON.parse(
      window.localStorage.getItem(VAPORBOY_OPTIONS_KEY)
    );
    // If we dont have vapor boy options, generate them
    if (!vaporBoyOptions) {
      // Fill/save our default options
      window.localStorage.setItem(
        VAPORBOY_OPTIONS_KEY,
        JSON.stringify(VAPORBOY_DEFAULT_OPTIONS)
      );
      vaporBoyOptions = Object.assign({}, VAPORBOY_DEFAULT_OPTIONS);
    }

    this.setState({
      ...this.state,
      stored: {
        ...vaporBoyOptions
      },
      current: {
        ...vaporBoyOptions
      },
      confirmationModal: {
        ...pubxConfirmationModalState
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
          // await WasmBoy.saveState();
          // window.localStorage.setItem(
          //   VAPORBOY_OPTIONS_KEY,
          //   JSON.stringify(VAPORBOY_DEFAULT_OPTIONS)
          // );
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
      }
    );
  }

  render() {
    const optionsSections = [];
    Object.keys(WASMBOY_OPTION_SECTIONS).forEach(sectionKey => {
      // Get our section
      const section = WASMBOY_OPTION_SECTIONS[sectionKey];

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
