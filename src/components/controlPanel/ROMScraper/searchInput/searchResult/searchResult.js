import { Component } from "preact";

import { Pubx } from "../../../../../services/pubx";
import { PUBX_CONFIG } from "../../../../../pubx.config";

export default class SearchResult extends Component {
  constructor() {
    super();
    this.setState({});
  }

  resultSelected() {
    console.log("game selected", this.props);

    Pubx.publish(PUBX_CONFIG.ROM_SCRAPER_KEY, {
      ROMInfo: {
        title: this.props.title,
        image: this.props.image
      },
      selectedROMIndex: this.props.index
    });
  }

  render() {
    const formattedDate = new Date(this.props.date).toDateString();

    let rootElementClass = "search-result";
    console.log(
      "result render",
      this.props.index,
      Pubx.get(PUBX_CONFIG.ROM_SCRAPER_KEY).selectedROMIndex
    );
    if (
      this.props.index ===
      Pubx.get(PUBX_CONFIG.ROM_SCRAPER_KEY).selectedROMIndex
    ) {
      rootElementClass += " search-result--selected";
    }

    return (
      <button class={rootElementClass} onClick={e => this.resultSelected()}>
        <div class="search-result__image">
          <img src={this.props.image} />
        </div>

        <div class="search-result__description">
          <div class="search-result__description__title">
            {this.props.title}
          </div>

          <div class="search-result__description__date">{formattedDate}</div>
        </div>
      </button>
    );
  }
}
