import { Component } from "preact";
import SearchResult from "./searchResult/searchResult";

import { Pubx } from "../../../../services/pubx";
import { PUBX_CONFIG } from "../../../../pubx.config";

export default class SearchInput extends Component {
  constructor() {
    super();
    this.setState({
      loading: false,
      results: [],
      currentSearch: undefined,
      executedSearch: undefined,
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
      loading: false,
      results: [],
      currentSearch: undefined,
      executedSearch: undefined,
      pubxROMScraperSubscriberKey: pubxROMScraperSubscriberKey
    });
  }

  performSearch() {
    // First search if we are already loading, or if we even changed our current search
    if (
      this.loading ||
      !this.state.currentSearch ||
      this.state.currentSearch === this.state.executedSearch
    ) {
      return;
    }

    Pubx.publish(PUBX_CONFIG.ROM_SCRAPER_KEY, {
      selectedROMIndex: -1
    });

    // Set that we are loading
    this.setState({
      ...this.state,
      loading: true,
      executedSearch: this.state.currentSearch
    });

    // Fetch from the vaporboy api
    fetch(
      `https://vaporboy.net/scrape/giantbomb?format=json&filter=name:${
        this.state.currentSearch
      },platforms:57|3&field_list=name,image,original_release_date,platforms`
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        const results = [];
        response.results.forEach((result, index) => {
          results.push(
            <SearchResult
              image={result.image.small_url}
              title={result.name}
              date={result.original_release_date}
              isSelected={false}
              index={index}
            />
          );
        });

        this.setState({
          ...this.state,
          loading: false,
          results: [...results]
        });
      });
  }

  render() {
    let results = (
      <div class="search-input__results__initial-search">
        Results Will Show Here...
      </div>
    );
    if (this.state.loading) {
      results = (
        <div class="search-input__loading">
          <div class="donut" />
        </div>
      );
    } else if (this.state.results && this.state.results.length > 0) {
      results = this.state.results;
    }

    let selectedROM = <div class="search-input__selected-ROM">&nbsp;</div>;
    if (
      this.state.ROMScraper &&
      this.state.ROMScraper.ROMInfo &&
      this.state.ROMScraper.ROMInfo.title
    ) {
      selectedROM = (
        <div class="search-input__selected-ROM">
          Selected ROM: {this.state.ROMScraper.ROMInfo.title}
        </div>
      );
    }

    return (
      <div class="search-input">
        <h1>Search</h1>

        <div class="search-input__search-bar">
          <input
            class="aesthetic-windows-95-text-input"
            type="text"
            placeholder="Search for a GB or GBC game..."
            value={this.state.currentSearch}
            onKeyDown={e =>
              this.setState({
                ...this.state,
                currentSearch: event.target.value
              })
            }
            onKeyPress={event => {
              if (event.key == "Enter") {
                this.performSearch();
              }
            }}
          />
          <div class="aesthetic-windows-95-button">
            <button onClick={e => this.performSearch()}>Search</button>
          </div>
        </div>

        {selectedROM}

        <div class="search-input__results">{results}</div>
      </div>
    );
  }
}
