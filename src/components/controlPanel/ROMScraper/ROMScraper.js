import { Component } from "preact";
import SearchInput from "./searchInput/searchInput";
import ManualInput from "./manualInput/manualInput";

export default class ROMScraper extends Component {
  constructor() {
    super();
    this.setState({
      activeTabIndex: 0
    });
  }

  setActiveTabIndex(activeTabIndex) {
    this.setState({
      ...this.state,
      activeTabIndex: activeTabIndex
    });
  }

  render() {
    const searchElement = <SearchInput />;

    const manualInputElement = <ManualInput />;

    let currentTabElement = searchElement;
    if (this.state.activeTabIndex === 1) {
      currentTabElement = manualInputElement;
    }

    return (
      <div class="ROMScraper">
        <div class="aesthetic-windows-95-tabbed-container">
          <div class="aesthetic-windows-95-tabbed-container-tabs">
            <div
              class={
                "aesthetic-windows-95-tabbed-container-tabs-button " +
                (this.state.activeTabIndex === 0 ? "is-active" : "")
              }
            >
              <button onClick={() => this.setActiveTabIndex(0)}>Search</button>
            </div>
            <div
              class={
                "aesthetic-windows-95-tabbed-container-tabs-button " +
                (this.state.activeTabIndex === 1 ? "is-active" : "")
              }
            >
              <button onClick={() => this.setActiveTabIndex(1)}>
                Manual Input
              </button>
            </div>
          </div>

          <div class="aesthetic-windows-95-container">
            {currentTabElement}

            <div class="ROMScraper__submit">
              <div class="aesthetic-windows-95-button">
                <button>Skip</button>
              </div>

              <div class="aesthetic-windows-95-button">
                <button disabled={this.state.activeTabIndex === 0}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
