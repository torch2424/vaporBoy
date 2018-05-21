// Super Gameboy Border
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

export default class WasmBoyCanvas extends Component {
  componentDidMount() {
    // Get our HTML5 Canvas element
    const canvasElement = document.querySelector("#wasmboy-canvas");

    // Initialize Wasmboy
    WasmBoy.config({}, canvasElement)
      .then(() => {
        console.log("WasmBoy is configured!");
        // You may now load games, or use other exported functions of the lib.
      })
      .catch(() => {
        console.error("Error Configuring WasmBoy...");
      });
  }

  render() {
    return (
      <div>
        <canvas id="wasmboy-canvas" />
      </div>
    );
  }
}
