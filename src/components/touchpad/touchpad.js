// Desktop Layout for vaporboy
import { Component } from "preact";

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
  }

  render() {
    return (
      <div class="vaporboy-touchpad">
        <div className="vaporboy-touchpad__button-layout">
          {/* VaporBoy specific buttons */}
          <div class="vaporboy-touchpad__button-layout__expand">
            <ExpandButton onClick={() => this.toggleExpand()} />
          </div>

          <div class="vaporboy-touchpad__button-layout__control-panel">
            <ControlPanelButton onClick={() => this.showControlPanel()} />
          </div>

          {/* Gameboy Buttons */}
          <div class="vaporboy-touchpad__button-layout__b-button">
            <GameboyButton button={"B"} />
          </div>
          <div class="vaporboy-touchpad__button-layout__a-button">
            <GameboyButton button={"A"} />
          </div>
          <div class="vaporboy-touchpad__button-layout__dpad">
            <GameboyDpad />
          </div>

          <div class="vaporboy-touchpad__button-layout__start-button">
            <GameboyButton button={"start"} />
          </div>

          <div class="vaporboy-touchpad__button-layout__select-button">
            <GameboyButton button={"select"} />
          </div>
        </div>
      </div>
    );
  }
}
