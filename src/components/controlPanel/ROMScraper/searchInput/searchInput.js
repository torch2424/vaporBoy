import { Component } from "preact";

export default class SearchInput extends Component {
  constructor() {
    super();
    this.setState({});
  }

  performSearch() {
    this.setState({
      ...this.state,
      loading: true,
      executedSearch: this.state.currentSearch
    });

    console.log("search", this.state);
  }

  render() {
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
            <button>Search</button>
          </div>
        </div>

        <div class="search-input__results">
          <div class="search-input__results__initial-search">
            Results Will Show Here...
          </div>
        </div>
      </div>
    );
  }
}
