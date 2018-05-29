import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import Cartridge from "../cartridge/cartridge";

export default class MyCollection extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>My Collection</h1>
      </div>
    );
  }
}
