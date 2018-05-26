import { Component } from "preact";

import Cartridge from "./cartridge/cartridge";

export default class ROMLoader extends Component {
  constructor() {
    super();
    this.setState({
      viewMyCollection: false,
      viewOpenSource: false
    });
  }

  render() {
    return (
      <div
        className={this.props.show ? "ROMLoader ROMLoader--show" : "ROMLoader"}
      >
        {/* Our initial screen */}
        <h1>ROM Loader</h1>

        <div class="cartridge-row">
          <div class="cartridge-row__cartridge">
            <Cartridge text={"My Collection"} />
          </div>
          <div class="cartridge-row__cartridge">
            <Cartridge text={"Open Source ROMs"} />
          </div>
          <div class="cartridge-row__cartridge">
            <Cartridge text={"Upload from my device"} />
          </div>
        </div>
      </div>
    );
  }
}
