import { Component } from "preact";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import {
  VAPORBOY_OPTIONS_LOCALSTORAGE_KEY,
  VAPORBOY_DEFAULT_OPTIONS
} from "../../../vaporboyOptions.config";
import { VAPORBOY_OPTION_SECTIONS } from "./vaporBoyOptions.sections";

import SettingsDisplay from "../settingsDisplay";

export default class VaporBoyOptions extends Component {
  constructor() {
    super();
    this.setState({
      options: {}
    });
  }

  componentDidMount() {
    // Subscribe to options changes
    const pubxVaporBoyOptionsSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.VAPORBOY_OPTIONS_KEY,
      newState => {
        this.setState({
          ...this.state,
          options: {
            ...newState
          }
        });
      }
    );

    this.setState({
      ...this.state,
      options: {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY)
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

  render() {
    if (!this.state.options || Object.keys(this.state.options).length <= 0) {
      return <div class="donut-loader" />;
    }

    const currentSettings = this.state.options;
    const settingsSections = VAPORBOY_OPTION_SECTIONS;
    const localStorageKey = VAPORBOY_OPTIONS_LOCALSTORAGE_KEY;
    const pubxConfigKey = PUBX_CONFIG.VAPORBOY_OPTIONS_KEY;
    const resetTitle = "Reset to Default options";
    const resetElement = (
      <div>
        Are you sure you would like to reset to the Default Vaporboy Options?
      </div>
    );
    const defaultSettings = VAPORBOY_DEFAULT_OPTIONS;
    const applyTitle = "Apply Options";
    const applyElement = (
      <div>
        This will reset any currently running ROM. A save state will be made.
        Apply options?
      </div>
    );

    return (
      <div class="vaporboy-options">
        <SettingsDisplay
          currentSettings={currentSettings}
          settingsSections={settingsSections}
          localStorageKey={localStorageKey}
          pubxConfigKey={pubxConfigKey}
          resetTitle={resetTitle}
          resetElement={resetElement}
          defaultSettings={defaultSettings}
          applyTitle={applyTitle}
          applyElement={applyElement}
        />
      </div>
    );
  }
}
