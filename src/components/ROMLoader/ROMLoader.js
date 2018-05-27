import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import ROMSourceSelector from "./ROMSourceSelector/ROMSourceSelector";

export default class ROMLoader extends Component {
  constructor() {
    super();
    this.setState({
      viewMyCollection: false,
      viewOpenSource: false
    });
  }

  hideROMLoader() {
    this.props.hide();
  }

  render() {
    let currentView = <ROMSourceSelector />;

    return (
      <div
        className={this.props.show ? "ROMLoader ROMLoader--show" : "ROMLoader"}
      >
        <h1>ROM Loader</h1>

        <button class="ROMLoader__close" onClick={() => this.hideROMLoader()}>
          X
        </button>

        {currentView}
      </div>
    );
  }
}
