// Our root component
import "./index.scss";
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

// Our Components
import SGBBorder from "./components/sgbBorder/sgbBorder";
import WasmBoyCanvas from "./components/wasmboyCanvas/wasmboyCanvas";

export default class App extends Component {
  componentDidMount() {
    document.addEventListener("deviceready", () => {
      console.log("Cordova Launched Device Ready!");
    });
    console.log("WasmBoy:", WasmBoy);
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <div class="aesthetic-windows-95-button">
          <button>OK</button>
        </div>
        <WasmBoyCanvas />
        <SGBBorder />
      </div>
    );
  }
}
