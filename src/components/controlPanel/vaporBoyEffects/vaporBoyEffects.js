import { Component } from "preact";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import {
  VAPORBOY_EFFECTS_LOCALSTORAGE_KEY,
  VAPORBOY_DEFAULT_EFFECTS
} from "../../../vaporboyEffects.config";
import { VAPORBOY_EFFECTS_SECTIONS } from "./vaporBoyEffects.sections";

import SettingsDisplay from "../settingsDisplay";

export default class VaporBoyEffects extends Component {
  constructor() {
    super();
    this.setState({
      effects: {}
    });
  }

  componentDidMount() {
    // Subscribe to options changes
    const pubxVaporBoyEffectsSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.VAPORBOY_EFFECTS_KEY,
      newState => {
        this.setState({
          ...this.state,
          effects: {
            ...newState
          }
        });
      }
    );

    this.setState({
      ...this.state,
      effects: {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_EFFECTS_KEY)
      },
      pubxVaporBoyEffectsSubscriberKey
    });
  }

  componentWillUnmount() {
    Pubx.unsubscribe(
      PUBX_CONFIG.VAPORBOY_EFFECTS_KEY,
      this.state.pubxVaporBoyEffectsSubscriberKey
    );
  }

  render() {
    const currentSettings = this.state.effects;
    const settingsSections = VAPORBOY_EFFECTS_SECTIONS;
    const localStorageKey = VAPORBOY_EFFECTS_LOCALSTORAGE_KEY;
    const pubxConfigKey = PUBX_CONFIG.VAPORBOY_EFFECTS_KEY;
    const resetTitle = "Clear All Effects";
    const resetElement = (
      <div>Are you sure you would like to clear all VaporBoy effects?</div>
    );
    const defaultSettings = VAPORBOY_DEFAULT_EFFECTS;
    const applyTitle = "Apply Effects";
    const applyElement = (
      <div>
        This will reset any currently running ROM. A save state will be made.
        Apply effects?
      </div>
    );

    return (
      <div class="vaporboy-effects">
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
