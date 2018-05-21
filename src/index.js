// Our root component
import "./index.scss";
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import VaporBoyDesktop from "./components/vaporboyDesktop/vaporboyDesktop";

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
        <VaporBoyDesktop />
      </div>
    );
  }
}
