// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";

export default class VaporBoyMobilePortrait extends Component {
  render() {
    // Generate our div of circles for our cirles
    const speakerCircles = [];
    for (let i = 0; i < 64; i++) {
      speakerCircles.push(<div />);
    }

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
          <div class="power-light">
            <div class="light" />
          </div>
        </div>

        <div className="vaporboy-mobile-portrait__feature-overlay">
          <div className="feature-layout">
            <div class="com-label">
              <div class="com-label__triangle">
                <svg>
                  <defs>
                    <radialGradient
                      id="TriangleFill"
                      cx="0.5"
                      cy="0.5"
                      fx="0.5"
                      fy="0.75"
                      r="0.80"
                    >
                      <stop offset="0%" stop-color="rgba(240, 240, 240, 0.0)" />
                      <stop
                        offset="30%"
                        stop-color="rgba(240, 240, 240, 0.0)"
                      />
                      <stop
                        offset="99%"
                        stop-color="rgba(240, 240, 240, 0.5)"
                      />
                      <stop
                        offset="100%"
                        stop-color="rgba(240, 240, 240, 0.0)"
                      />
                    </radialGradient>
                  </defs>
                  <polygon
                    points="0, 10, 5,0 10, 10"
                    fill="url(#TriangleFill)"
                  />
                </svg>
              </div>
              <div class="com-label__text">COMM.</div>
            </div>
            <div class="speaker">{speakerCircles}</div>
          </div>
        </div>
      </div>
    );
  }
}
