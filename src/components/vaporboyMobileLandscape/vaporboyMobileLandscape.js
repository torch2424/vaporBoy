// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

// Our Components
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";
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

        <div className="vaporboy-mobile-landscape__touchpad-overlay">
          <div className="button-layout">
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
