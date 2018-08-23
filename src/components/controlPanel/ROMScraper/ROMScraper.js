import { Component } from "preact";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import SearchInput from "./searchInput/searchInput";
import ManualInput from "./manualInput/manualInput";

export default class ROMScraper extends Component {
  constructor() {
    super();

    this.setState({
      ROMScraper: {
        ...Pubx.get(PUBX_CONFIG.ROM_SCRAPER_KEY)
      }
    });
  }

  componentDidMount() {
    const pubxROMScraperSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.ROM_SCRAPER_KEY,
      newState => {
        this.setState({
          ...this.state,
          ROMScraper: {
            ...newState
          }
        });
      }
    );

    this.setState({
      ...this.state,
      pubxROMScraperSubscriberKey: pubxROMScraperSubscriberKey
    });
  }

  componentWillUnmount() {
    // unsubscribe from the state
    Pubx.unsubscribe(
      PUBX_CONFIG.ROM_SCRAPER_KEY,
      this.state.pubxROMScraperSubscriberKey
    );
  }

  setActiveTabIndex(activeTabIndex) {
    Pubx.publish(PUBX_CONFIG.ROM_SCRAPER_KEY, {
      activeTabIndex: activeTabIndex
    });
  }

  shouldDisableSubmit() {
    return (
      !this.state.ROMScraper ||
      !this.state.ROMScraper.ROMInfo ||
      Object.keys(this.state.ROMScraper.ROMInfo) <= 0 ||
      !this.state.ROMScraper.ROMInfo.title
    );
  }

  render() {
    const searchElement = <SearchInput />;

    const manualInputElement = <ManualInput />;

    let currentTabElement = searchElement;
    if (this.state.ROMScraper.activeTabIndex === 1) {
      currentTabElement = manualInputElement;
    }

    return (
      <div class="ROMScraper">
        <div class="aesthetic-windows-95-tabbed-container">
          <div class="aesthetic-windows-95-tabbed-container-tabs">
            <div
              class={
                "aesthetic-windows-95-tabbed-container-tabs-button " +
                (this.state.ROMScraper.activeTabIndex === 0 ? "is-active" : "")
              }
            >
              <button onClick={() => this.setActiveTabIndex(0)}>Search</button>
            </div>
            <div
              class={
                "aesthetic-windows-95-tabbed-container-tabs-button " +
                (this.state.ROMScraper.activeTabIndex === 1 ? "is-active" : "")
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
                <button disabled={this.shouldDisableSubmit()}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
