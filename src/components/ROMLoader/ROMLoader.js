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
      </div>
    );
  }
}
