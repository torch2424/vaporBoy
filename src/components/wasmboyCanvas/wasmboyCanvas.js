// Super Gameboy Border
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

export default class WasmBoyCanvas extends Component {
  componentDidMount() {
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
  }

  render() {
    return <canvas id="wasmboy-canvas" />;
  }
}
