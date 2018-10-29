// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

import ExpandButton from "./expandButton/expandButton";
import ControlPanelButton from "./controlPanelButton/controlPanelButton";
import GameboyButton from "./gameboyButton/gameboyButton";
import GameboyDpad from "./gameboyDpad/gameboyDpad";

export default class Touchpad extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {}

  toggleExpand() {
    const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
    Pubx.publish(PUBX_CONFIG.LAYOUT_KEY, {
      expanded: !pubxLayoutState.expanded
    });
  }

  showControlPanel() {
    Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, {
      show: true
    });
    // Calling resume Audio Context here, as it is always touched on mobile
    WasmBoy.resumeAudioContext();
  }

  render() {
    return (
      <div class="vaporboy-touchpad">
        {/* VaporBoy specific buttons */}
        <div class="vaporboy-touchpad__expand">
          <ExpandButton onClick={() => this.toggleExpand()} />
        </div>

        <div class="vaporboy-touchpad__control-panel">
          <ControlPanelButton onClick={() => this.showControlPanel()} />
        </div>

        <div className="vaporboy-touchpad__button-layout">
          {/* Gameboy Buttons */}
          <div
            class="vaporboy-touchpad__button-layout__b-button"
            aria-hidden="true"
          >
            <GameboyButton button={"B"} />
          </div>
          <div
            class="vaporboy-touchpad__button-layout__a-button"
            aria-hidden="true"
          >
            <GameboyButton button={"A"} />
          </div>
          <div
            class="vaporboy-touchpad__button-layout__dpad"
            aria-hidden="true"
          >
            <GameboyDpad />
          </div>

          <div
            class="vaporboy-touchpad__button-layout__start-button"
            aria-hidden="true"
          >
            <GameboyButton button={"start"} />
          </div>

          <div
            class="vaporboy-touchpad__button-layout__select-button"
            aria-hidden="true"
          >
            <GameboyButton button={"select"} />
          </div>
        </div>
      </div>
    );
  }
}
