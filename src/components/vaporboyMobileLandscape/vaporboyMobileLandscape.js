// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";
import ExpandButton from "../touchpad/expandButton/expandButton";
import ControlPanelButton from "../touchpad/controlPanelButton/controlPanelButton";
import GameboyButton from "../touchpad/gameboyButton/gameboyButton";
import GameboyDpad from "../touchpad/gameboyDpad/gameboyDpad";

export default class VaporBoyMobileLandscape extends Component {
  render() {
    return (
      <div class="vaporboy-mobile-landscape">
        {/*Canvas and GBA Border*/}
        <div class="vaporboy-mobile-landscape__game-container">
          <div className="wasmboy-canvas-container">
            <WasmBoyCanvas />
          </div>
          <div className="gba-border">
            <img src="assets/borders/gbaBorder.png" />
          </div>
        </div>

        <div className="vaporboy-mobile-landscape__feature-overlay">
          <div className="feature-layout">
            <div class="power-light">
              <div class="light" />
              <div class="power-light__text">Power</div>
            </div>
            <div class="speaker">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>

        <div className="vaporboy-mobile-landscape__touchpad-overlay">
          <div className="button-layout">
            {/* VaporBoy specific buttons */}
            <div class="vaporboy-mobile-landscape__touchpad-overlay__expand">
              <ExpandButton onClick={() => this.props.toggleExpand()} />
            </div>

            <div class="vaporboy-mobile-landscape__touchpad-overlay__control-panel">
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
