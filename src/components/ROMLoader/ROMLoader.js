import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import Cartridge from "./cartridge/cartridge";

export default class ROMLoader extends Component {
  constructor() {
    super();
    this.setState({
      viewMyCollection: false,
      viewOpenSource: false
    });
  }

  hideROMLoader() {
    this.props.show = false;
    this.setState({ ...this.state });
  }

  triggerLocalFileUpload() {
    document.getElementById("ROMFileInput").click();
  }

  loadLocalFile(event) {
    const loadFileTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(event.target.files[0]);
      console.log("Wasmboy Ready!");
      await WasmBoy.play();
    };

    loadFileTask();
  }

  render() {
    return (
      <div
        className={this.props.show ? "ROMLoader ROMLoader--show" : "ROMLoader"}
      >
        {/* Our initial screen */}
        <h1>ROM Loader</h1>
        <button onClick={() => this.hideROMLoader()}>Close</button>

        <div class="cartridge-row">
          <div class="cartridge-row__cartridge">
            <Cartridge text={"My Collection"} />
          </div>
          <div class="cartridge-row__cartridge">
            <Cartridge text={"Open Source ROMs"} />
          </div>
          <div class="cartridge-row__cartridge">
            <input
              type="file"
              id="ROMFileInput"
              accept=".gb, .gbc, .zip"
              onChange={event => {
                this.loadLocalFile(event);
              }}
            />
            <Cartridge
              text={"Upload from my device"}
              onClick={() => this.triggerLocalFileUpload()}
            />
          </div>
        </div>
      </div>
    );
  }
}
