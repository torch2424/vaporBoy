import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

/*
PROPS:

currentSettings: Object of the current settings
settingsSections: Sections type object that defines the layout of the object descriptor
localStorageKey: Key of the localstorage object that stores the settings
pubxConfigKey: Key of the pubx object that stores the settings

resetTitle: Title of the reset to default modal
resetElement: Element of the reset to default modal
defaultSettings: Object of the settings when the settings are reset to default

applyTitle: Title of the Apply options modal
applyElement: Element of the apply options modal

*/

export default class SettingsDisplay extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      stored: {
        ...this.props.currentSettings
      },
      current: {
        ...this.props.currentSettings
      },
      confirmationModal: {
        ...Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY)
      },
      controlPanel: {
        ...Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY)
      }
    });
  }

  componentWillReceiveProps() {
    this.setState({
      ...this.state,
      stored: {
        ...this.props.currentSettings
      },
      current: {
        ...this.props.currentSettings
      }
    });
  }

  updateSetting(event, settingKey, setting) {
    const current = {
      ...this.state.current
    };

    if (setting.type === "integer") {
      current[settingKey] = parseInt(event.target.value, 10);
    } else if (setting.type === "boolean") {
      current[settingKey] = event.target.checked;
    }

    this.setState({
      ...this.state,
      current: {
        ...current
      }
    });
  }

  showSettingInfo(setting) {
    this.state.confirmationModal.showConfirmationModal(
      setting.name,
      setting.descriptionElement
    );
  }

  confirmReset() {
    Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY).showConfirmationModal(
      this.props.resetTitle,
      this.props.resetElement,
      () => {
        // If confirm, reset

        // Save the state
        const resetSettingsTask = async () => {
          if (WasmBoy.isReady()) {
            await WasmBoy.saveState();
          }

          window.localStorage.setItem(
            this.props.localStorageKey,
            JSON.stringify(this.props.defaultSettings)
          );
          Pubx.publish(this.props.pubxConfigKey, this.props.defaultSettings);
          this.state.controlPanel.hideControlPanel();
        };

        // Run the task
        resetSettingsTask();
      }
    );
  }

  confirmApply() {
    Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY).showConfirmationModal(
      this,
      props.applyTitle,
      this.props.applyElement,
      () => {
        // If confirm, apply

        const applyOptionsTask = async () => {
          if (WasmBoy.isReady()) {
            await WasmBoy.saveState();
          }

          window.localStorage.setItem(
            this.props.localStorageKey,
            JSON.stringify(this.state.current)
          );
          Pubx.publish(this.props.pubxConfigKey, this.state.current);
          this.state.controlPanel.hideControlPanel();
        };

        // Run the task
        applyOptionsTask();
      }
    );
  }

  render() {
    if (
      !this.props.currentSettings ||
      !this.props.settingsSections ||
      !this.state.current
    ) {
      return <div class="donut-loader" />;
    }

    const settingsSections = [];
    Object.keys(this.props.settingsSections).forEach(sectionKey => {
      // Get our section
      const section = this.props.settingsSections[sectionKey];

      settingsSections.push(
        <div class="vaporboy-settings__section-header">
          <h3 class="vaporboy-settings__section-header__title">
            {section.name}
          </h3>
          <div class="vaporboy-settings__section-header__description">
            {section.descriptionElement}
          </div>
        </div>
      );

      Object.keys(section.settings).forEach(settingKey => {
        // Get our setting
        const setting = section.settings[settingKey];

        let settingElement;
        if (setting.type === "boolean") {
          settingElement = (
            <li class="vaporboy-settings__setting">
              <label class="aesthetic-windows-95-checkbox">
                {setting.name}
                <input
                  type="checkbox"
                  checked={this.state.current[settingKey]}
                  onChange={event =>
                    this.updateSetting(event, settingKey, setting)
                  }
                />
                <span class="aesthetic-windows-95-checkmark" />
              </label>

              <div class="vaporboy-settings__setting__description-element">
                {setting.descriptionElement}
              </div>
            </li>
          );
        } else if (setting.type === "integer") {
          settingElement = (
            <li class="vaporboy-settings__setting">
              <input
                class="aesthetic-windows-95-text-input"
                type="number"
                min={setting.min}
                max={setting.max}
                value={this.state.current[settingKey]}
                onChange={event =>
                  this.updateSetting(event, settingKey, setting)
                }
              />
              <div class="vaporboy-settings__setting__name">{setting.name}</div>

              <div class="vaporboy-settings__setting__description-element">
                {setting.descriptionElement}
              </div>
            </li>
          );
        }

        // Finally push the option element if we have one
        if (settingElement) {
          settingsSections.push(settingElement);
        }
      });
    });

    return (
      <div class="vaporboy-settings">
        <ul>{settingsSections}</ul>
        <div class="vaporboy-settings__apply-settings">
          <div class="aesthetic-windows-95-button">
            <button onClick={() => this.confirmReset()}>
              Reset to default settings
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
