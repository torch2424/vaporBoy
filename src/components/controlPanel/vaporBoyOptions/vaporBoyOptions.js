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
    // Grab our options from localstorage
    let vaporBoyOptions = JSON.parse(
      window.localStorage.getItem(VAPORBOY_OPTIONS_KEY)
    );
    if (vaporBoyOptions) {
      this.setState({
        ...this.state,
        stored: {
          ...vaporBoyOptions
        },
        current: {
          ...vaporBoyOptions
        }
      });
    } else {
      // Fill/save our default options
      window.localStorage.setItem(
        VAPORBOY_OPTIONS_KEY,
        JSON.stringify(VAPORBOY_DEFAULT_OPTIONS)
      );
      vaporBoyOptions = Object.assign({}, VAPORBOY_DEFAULT_OPTIONS);
    }

    console.log(vaporBoyOptions);

    this.setState({
      stored: {
        ...vaporBoyOptions
      },
      current: {
        ...vaporBoyOptions
      }
    });
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
            <li class="vaporboy-options__option--bolean">
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
            </li>
          );
        } else if (option.type === "integer") {
          optionElement = (
            <li class="vaporboy-options__option--integer">
              <div class="vaporboy-options__option--integer__name">
                {option.name}
              </div>
              <input
                class="aesthetic-windows-95-text-input"
                type="number"
                min={option.min}
                max={option.max}
                value={this.state.current[optionKey]}
                onChange={event => this.updateOption(event, optionKey, option)}
              />
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
        <button>Apply</button>
        <button>Reset to default options</button>
      </div>
    );
  }
}
