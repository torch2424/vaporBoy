// Our root component
import "./index.scss";
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import VaporBoyDesktop from "./components/vaporboyDesktop/vaporboyDesktop";
import VaporBoyMobileLandscape from "./components/vaporboyMobileLandscape/vaporboyMobileLandscape";
import VaporBoyExpanded from "./components/vaporboyExpanded/vaporboyExpanded";
import ControlPanel from "./components/controlPanel/controlPanel";

export default class App extends Component {
  constructor() {
    super();
    this.setState({
      expanded: false,
      showControlPanel: true
    });
  }

  toggleExpand() {
    this.setState({
      ...this.state,
      expanded: !this.state.expanded
    });
  }

  showControlPanel() {
    this.setState({
      ...this.state,
      showControlPanel: true
    });
  }

  hideControlPanel() {
    this.setState({
      ...this.state,
      showControlPanel: false
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
      <VaporBoyDesktop
        toggleExpand={() => this.toggleExpand()}
        showControlPanel={() => this.showControlPanel()}
      />
    );
    let vaporboyMobileLandscapeLayout = (
      <VaporBoyMobileLandscape
        toggleExpand={() => this.toggleExpand()}
        showControlPanel={() => this.showControlPanel()}
      />
    );
    let vaporboyExpandedLayout = (
      <VaporBoyExpanded toggleExpand={() => this.toggleExpand()} />
    );

    // Get our current layout
    // TODO: Do some platform detection
    let currentLayout = vaporboyDesktopLayout;
    //currentLayout = vaporboyMobileLandscapeLayout;

    if (this.state.expanded) {
      currentLayout = vaporboyExpandedLayout;
    }

    return (
      <div>
        <ControlPanel
          show={this.state.showControlPanel}
          hide={() => {
            this.hideControlPanel();
          }}
        />
        {currentLayout}
      </div>
    );
  }
}
