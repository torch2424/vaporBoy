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

    // Set the expanded class
    document.documentElement.classList.add("expanded");
  }

  componentWillUnmount() {
    document.documentElement.classList.remove("expanded");
  }

  render() {
    return (
      <div class="vaporboy-expanded">
        <div className="wasmboy-canvas-container">
          <WasmBoyCanvas />
        </div>
      </div>
    );
  }
}
