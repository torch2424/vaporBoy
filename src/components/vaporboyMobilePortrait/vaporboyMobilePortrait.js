// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";
import ExpandButton from "../touchpad/expandButton/expandButton";
import ControlPanelButton from "../touchpad/controlPanelButton/controlPanelButton";
import GameboyButton from "../touchpad/gameboyButton/gameboyButton";
import GameboyDpad from "../touchpad/gameboyDpad/gameboyDpad";

export default class VaporBoyMobilePortrait extends Component {
  render() {
    return (
      <div class="vaporboy-mobile-portrait">
        {/*Canvas and GBA Border*/}
        <div class="vaporboy-mobile-portrait__game-container">
          <div className="wasmboy-canvas-container">
            <WasmBoyCanvas />
          </div>
          <div className="gbc-border">
            <img src="assets/borders/gbcBorder.png" />
          </div>
        </div>

        <div className="vaporboy-mobile-portrait__feature-overlay">
          <div className="feature-layout">
            <div class="power">
              <div class="power__light" />
              <div class="power__text">Power</div>
            </div>
          </div>
        </div>

        <div className="vaporboy-mobile-portrait__touchpad-overlay">
          <div className="button-layout">
            {/* VaporBoy specific buttons */}
            <div class="vaporboy-mobile-portrait__touchpad-overlay__expand">
              <ExpandButton onClick={() => this.props.toggleExpand()} />
            </div>

            <div class="vaporboy-mobile-portrait__touchpad-overlay__control-panel">
              <ControlPanelButton
                onClick={() => this.props.showControlPanel()}
              />
            </div>

            {/* Gameboy Buttons */}
            <div class="b-button">
              <GameboyButton button={"B"} />
            </div>
            <div class="a-button">
              <GameboyButton button={"A"} />
            </div>
            <div class="dpad">
              <GameboyDpad />
            </div>

            <div class="start-button">
              <GameboyButton button={"start"} />
            </div>

            <div class="select-button">
              <GameboyButton button={"select"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
