// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";

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
      </div>
    );
  }
}
