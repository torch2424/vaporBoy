// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";

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
        <div className="wasmboy-canvas">
          <WasmBoyCanvas />
        </div>
        <div class="vaporboy-expanded__controls">
          <button
            class="vaporboy-expanded__controls__exit-expand"
            onClick={() => this.props.toggleExpand()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" />
              <path
                class="vaporboy-expanded__controls__exit-expand__path"
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
