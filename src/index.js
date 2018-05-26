// Our root component
import "./index.scss";
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import VaporBoyDesktop from "./components/vaporboyDesktop/vaporboyDesktop";
import VaporBoyExpanded from "./components/vaporboyExpanded/vaporboyExpanded";
import ROMLoader from "./components/ROMLoader/ROMLoader";

export default class App extends Component {
  constructor() {
    super();
    this.setState({
      expanded: false
    });
  }

  toggleExpand() {
    this.setState({
      ...this.state,
      expanded: !this.state.expanded
    });
  }

  componentDidMount() {
    document.addEventListener("deviceready", () => {
      console.log("Cordova Launched Device Ready!");
    });
    console.log("WasmBoy:", WasmBoy);
  }

  render() {
    // Define our layouts
    let vaporboyDesktopLayout = (
      <VaporBoyDesktop toggleExpand={() => this.toggleExpand()} />
    );
    let vaporboyExpandedLayout = (
      <VaporBoyExpanded toggleExpand={() => this.toggleExpand()} />
    );

    // Get our current layout
    let currentLayout = vaporboyDesktopLayout;

    if (this.state.expanded) {
      currentLayout = vaporboyExpandedLayout;
    }

    return (
      <div>
        <ROMLoader show={true} />
        {currentLayout}
      </div>
    );
  }
}
