// Our root component
import "./index.scss";
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { CONTROL_PANEL_BASE_COMPONENTS } from "./components/controlPanel/baseComponent";

import VaporBoyDesktop from "./components/vaporboyDesktop/vaporboyDesktop";
import VaporBoyMobileLandscape from "./components/vaporboyMobileLandscape/vaporboyMobileLandscape";
import VaporBoyExpanded from "./components/vaporboyExpanded/vaporboyExpanded";
import ControlPanel from "./components/controlPanel/controlPanel";

export default class App extends Component {
  constructor() {
    super();
    this.setState({
      expanded: true,
      baseComponent: undefined,
      showControlPanel: false
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
      showControlPanel: true,
      baseComponent: undefined
    });
  }

  showROMSourceSelector() {
    this.setState({
      ...this.state,
      showControlPanel: true,
      baseComponent: CONTROL_PANEL_BASE_COMPONENTS.ROM_SOURCE_SELECTOR
    });
  }

  showSaveStates() {
    this.setState({
      ...this.state,
      showControlPanel: true,
      baseComponent: undefined // TODO: Save State Component
    });
  }

  hideControlPanel() {
    this.setState({
      ...this.state,
      showControlPanel: false,
      baseComponent: undefined
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
        showROMSourceSelector={() => this.showROMSourceSelector()}
      />
    );
    let vaporboyMobileLandscapeLayout = (
      <VaporBoyMobileLandscape
        toggleExpand={() => this.toggleExpand()}
        showControlPanel={() => this.showControlPanel()}
      />
    );
    let vaporboyExpandedLayout = (
      <VaporBoyExpanded
        toggleExpand={() => this.toggleExpand()}
        showControlPanel={() => this.showControlPanel()}
      />
    );

    // Get our current layout
    // TODO: Do some platform detection
    let currentLayout = vaporboyDesktopLayout;
    currentLayout = vaporboyMobileLandscapeLayout;

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
          baseComponent={this.state.baseComponent}
        />
        {currentLayout}
      </div>
    );
  }
}
