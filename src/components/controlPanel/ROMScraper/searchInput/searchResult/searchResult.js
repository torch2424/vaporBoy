import { Component } from "preact";

export default class SearchResult extends Component {
  constructor() {
    super();
    this.setState({});
  }

  render() {
    return (
      <button class="search-result">
        <div class="search-result__image">
          <img src={this.props.image} />
        </div>

        <div class="search-result__description">
          <div class="search-result__description__title">
            {this.props.title}
          </div>

          <div class="search-result__description__date">{this.props.date}</div>
        </div>
      </button>
    );
  }
}
