import { Component } from "preact";

import { Pubx } from "../../../../services/pubx";
import { PUBX_CONFIG } from "../../../../pubx.config";

export default class ManualInput extends Component {
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

  render() {
    return (
      <div class="manual-input">
        <h1>Manual Input</h1>

        <div class="manual-input__title">
          <div class="manual-input__title__label">
            Type the title for the ROM:
          </div>
          <input
            class="aesthetic-windows-95-text-input"
            type="text"
            placeholder="Title"
            value={this.state.ROMScraper.ROMInfo.title}
            onKeyDown={e =>
              Pubx.publish(PUBX_CONFIG.ROM_SCRAPER_KEY, {
                ROMInfo: {
                  ...Pubx.get(PUBX_CONFIG.ROM_SCRAPER_KEY).ROMInfo,
                  title: event.target.value
                }
              })
            }
          />
        </div>

        <div class="manual-input__image">
          <div class="manual-input__image__label">
            Upload and image for the ROM:
          </div>
        </div>
      </div>
    );
  }
}
