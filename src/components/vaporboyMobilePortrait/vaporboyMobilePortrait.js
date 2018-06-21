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
                  <polygon points="0, 10, 5,0 10, 10" />
                </svg>
              </div>
              <div class="com-label__text">COMM.</div>
            </div>
            <div class="speaker">{speakerCircles}</div>
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
              <GameboyButton button={"B"} isGbc={true} />
            </div>
            <div class="a-button">
              <GameboyButton button={"A"} isGbc={true} />
            </div>
            <div class="dpad">
              <GameboyDpad isGbc={true} />
            </div>

            <div class="start-button">
              <GameboyButton button={"start"} isGbc={true} />
            </div>

            <div class="select-button">
              <GameboyButton button={"select"} isGbc={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
