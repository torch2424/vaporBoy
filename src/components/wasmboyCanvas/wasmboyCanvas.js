// Super Gameboy Border
import { Component } from "preact";
import { WasmBoy } from "wasmboy";
import { WASMBOY_CONFIG } from "../../wasmboy.config";

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
        await WasmBoy.config(WASMBOY_CONFIG, canvasElement);
        console.log("WasmBoy is configured!");
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
    // Our insert cartridge menu
    let insertCartridge = "";
    if (!WasmBoy.isReady()) {
      insertCartridge = (
        <div class="wasmboy-canvas__insert-cartridge">
          <img src="assets/vaporboyvhs.png" />
          <h1>V A P O R B O Y</h1>
          <h3>Please insert a cartridge...</h3>
        </div>
      );
    }

    return (
      <div class="wasmboy-canvas">
        {insertCartridge}
        <div class="wasmboy-canvas__canvas-container">
          <canvas id="wasmboy-canvas" />
        </div>
      </div>
    );
  }
}
