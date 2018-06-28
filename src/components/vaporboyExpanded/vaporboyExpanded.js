// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";
import ExpandButton from "../touchpad/expandButton/expandButton";
import ControlPanelButton from "../touchpad/controlPanelButton/controlPanelButton";
import GameboyButton from "../touchpad/gameboyButton/gameboyButton";
import GameboyDpad from "../touchpad/gameboyDpad/gameboyDpad";

// 3P libs
import * as screenfull from "screenfull";

export default class VaporBoyExpanded extends Component {
  componentDidMount() {
    if (screenfull.enabled) {
      screenfull.on("change", () => {
        // Set the state to re-render and update our fullscreen icon
        this.setState();
      });
    }

    // Set HTML/Body BG color
    document.documentElement.classList.add("vaporboy-expanded-bg");
    document.body.classList.add("vaporboy-expanded-bg");
  }

  componentWillUnmount() {
    document.documentElement.classList.remove("vaporboy-expanded-bg");
    document.body.classList.remove("vaporboy-expanded-bg");
  }

  render() {
    return (
      <div class="vaporboy-expanded">
        <div className="wasmboy-canvas-container">
          <WasmBoyCanvas />
        </div>

        <div class="vaporboy-expanded__controls">
          <div class="vaporboy-expanded__controls__container">
            <div class="vaporboy-expanded__controls__container__expand">
              <ExpandButton
                expanded={true}
                onClick={() => this.props.toggleExpand()}
              />
            </div>

            <div class="vaporboy-expanded__controls__container__control-panel">
              <ControlPanelButton
                onClick={() => this.props.showControlPanel()}
              />
            </div>

            {/* Gameboy Buttons */}
            <div class="b-button">
              <GameboyButton button={"B"} isExpanded={true} />
            </div>
            <div class="a-button">
              <GameboyButton button={"A"} isExpanded={true} />
            </div>
            <div class="dpad">
              <GameboyDpad isExpanded={true} />
            </div>

            <div class="start-button">
              <GameboyButton button={"start"} isExpanded={true} />
            </div>

            <div class="select-button">
              <GameboyButton button={"select"} isExpanded={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
