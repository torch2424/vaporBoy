// Desktop Layout for vaporboy
import { Component } from "preact";

// Our Components
import WasmBoyCanvas from "../wasmboyCanvas/wasmboyCanvas";

export default class VaporBoyExpanded extends Component {
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
