import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import {
  VAPORBOY_OPTIONS_KEY,
  VAPORBOY_DEFAULT_OPTIONS,
  WASMBOY_OPTION_SECTIONS
} from "./vaporBoyOptions.constants";

export default class VaporBoyOptions extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    // Grab our options from localstorage
    let vaporBoyOptions = window.localStorage.getItem(VAPORBOY_OPTIONS_KEY);
    if (vaporBoyOptions) {
      this.setState({
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
        VAPORBOY_DEFAULT_OPTIONS
      );
      vaporBoyOptions = Object.assign({}, VAPORBOY_DEFAULT_OPTIONS);
    }

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
            <li class="vaporboy-options__option">
              <label
                class="aesthetic-windows-95-checkbox"
                data-tooltip={option.description}
              >
                {option.name}
                <input
                  type="checkbox"
                  onChange={event =>
                    this.updateOption(event, optionKey, option)
                  }
                />
                <span class="aesthetic-windows-95-checkmark" />
              </label>
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
      </div>
    );
  }
}
