// Desktop Layout for vaporboy
import { Component } from "preact";
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

  render() {
    return (
      <div class="vaporboy-touchpad">
        <div className="vaporboy-touchpad__button-layout">
          {/* VaporBoy specific buttons */}
          <div class="vaporboy-touchpad__button-layout__expand">
            <ExpandButton onClick={() => this.props.toggleExpand()} />
          </div>

          <div class="vaporboy-touchpad__button-layout__control-panel">
            <ControlPanelButton onClick={() => this.props.showControlPanel()} />
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
