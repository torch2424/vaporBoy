// Super Gameboy Border
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

export default class WasmBoyCanvas extends Component {
  componentDidMount() {
    // Check if we are already ready and initialized
    // (this is to avoid resetting a game on layout changes)
    if (!WasmBoy.isReady()) {
      console.log("yooo");
      // Get our HTML5 Canvas element
      const canvasElement = document.querySelector("#wasmboy-canvas");

      const wasmboyInitTask = async () => {
        await WasmBoy.config({}, canvasElement);
        console.log("WasmBoy is configured!");
        await WasmBoy.loadROM("assets/openSourceGames/tobutobugirl.gb");
        console.log("TobuTobuGirl loaded!");
        await WasmBoy.play();
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
    return <canvas id="wasmboy-canvas" />;
  }
}
