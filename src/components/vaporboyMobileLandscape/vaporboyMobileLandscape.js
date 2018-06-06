// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

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

        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient
              id="ButtonBackground"
              cx="0.5"
              cy="0.5"
              r="0.75"
              fx="0.5"
              fy="0.95"
            >
              <stop offset="0%" stop-color="#cdd5e1" />
              <stop offset="100%" stop-color="#f2f5fd" />
            </radialGradient>

            <radialGradient
              id="ButtonLetter"
              cx="0.5"
              cy="0.5"
              r="0.75"
              fx="0.5"
              fy="0.95"
            >
              <stop offset="0%" stop-color="#aeb4bb" />
              <stop offset="100%" stop-color="#f2f5fd" />
            </radialGradient>
          </defs>

          <circle cx="50" cy="50" r="49" fill="url(#ButtonBackground)" />
          <text x="15" y="75" fill="url(#ButtonLetter)">
            B
          </text>
        </svg>
      </div>
    );
  }
}
