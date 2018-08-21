import { Component } from "preact";
import SearchResult from "./searchResult/searchResult";

export default class SearchInput extends Component {
  constructor() {
    super();
    this.setState({
      loading: false,
      results: [],
      selectedGame: undefined,
      selectedGameIndex: undefined
    });
  }

  gameSelected(gameInfo, index) {
    this.setState({
      ...this.state,
      selectedGame: gameInfo,
      selectedGameIndex: index
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

    // Set that we are loading
    this.setState({
      ...this.state,
      loading: true,
      executedSearch: this.state.currentSearch,
      selectedGame: undefined,
      selectedGameIndex: undefined
    });

    console.log("search", this.state);

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
        console.log(response);
        const results = [];
        response.results.forEach(game => {
          results.push(
            <SearchResult
              image={game.image.small_url}
              title={game.name}
              date={game.original_release_date}
              isSelected={false}
              onSelect={(gameInfo, index) => this.gameSelected(gameInfo, index)}
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
      results = <div class="donut" />;
    } else if (this.state.results && this.state.results.length > 0) {
      results = this.state.results;
    }

    return (
      <div class="search-input">
        <h1>Search</h1>

        <div class="search-input__search-bar">
          <input
            class="aesthetic-windows-95-text-input"
            type="text"
            placeholder="Search for a GB or GBC game..."
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

        <div class="search-input__results">{results}</div>
      </div>
    );
  }
}
