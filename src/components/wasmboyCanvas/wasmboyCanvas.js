// Super Gameboy Border
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

export default class WasmBoyCanvas extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    // Check if we are already ready and initialized
    // (this is to avoid resetting a game on layout changes)
    if (!WasmBoy.isReady()) {
      // Get our HTML5 Canvas element
      const canvasElement = document.querySelector("#wasmboy-canvas");

      const wasmboyInitTask = async () => {
        await WasmBoy.config({}, canvasElement);
        console.log("WasmBoy is configured!");

        // Paint vaporboy on the canvas
        this.paintVaporBoy();
      };

      wasmboyInitTask();
    } else if (WasmBoy.isPlaying()) {
      // Get our HTML5 Canvas element
      const canvasElement = document.querySelector("#wasmboy-canvas");

      const setCanvasTask = async () => {
        await WasmBoy.setCanvas(canvasElement);
        await WasmBoy.play();
      };

      setCanvasTask();
    }
  }

  render() {
    return (
      <div class="wasmboy-canvas">
        <div class="wasmboy-canvas__insert-cartridge">
          <img src="assets/vaporboyvhs.png" />
          <h1>V A P O R B O Y</h1>
          <h3>Please insert a cartridge...</h3>
        </div>
        <canvas id="wasmboy-canvas" />
      </div>
    );
  }
}
