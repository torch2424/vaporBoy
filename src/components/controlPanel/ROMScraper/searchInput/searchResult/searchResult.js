import { Component } from "preact";

import { Pubx } from "../../../../../services/pubx";
import { PUBX_CONFIG } from "../../../../../pubx.config";

export default class SearchResult extends Component {
  constructor() {
    super();
    this.setState({
      loading: false
    });
  }

  resultSelected() {
    // IIFE
    (async () => {
      // We need to convert our image to base 64
      const imageToDataUrlTask = async imageUrl => {
        fetch(imageUrl)
          .then(response => response.blob())
          .then(blob => {
            const fileReader = new FileReader();
            fileReader.onload = onloadEvent => {
              Pubx.publish(PUBX_CONFIG.ROM_SCRAPER_KEY, {
                ROMInfo: {
                  title: this.props.title,
                  imageUrl: onloadEvent.target.result
                },
                selectedROMIndex: this.props.index
              });

              this.setState({
                ...this.state,
                loading: false
              });
            };
            fileReader.readAsDataURL(blob);
          });
      };

      this.setState({
        ...this.state,
        loading: true
      });
      imageToDataUrlTask(this.props.image);
    })();
  }

  render() {
    const formattedDate = new Date(this.props.date).toDateString();

    let rootElementClass = "search-result";
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
          {this.state.loading ? (
            <div class="search-result--loading">
              <div class="donut" />
            </div>
          ) : (
            <div>
              <div class="search-result__description__title">
                {this.props.title}
              </div>

              <div class="search-result__description__date">
                {formattedDate}
              </div>
            </div>
          )}
        </div>
      </button>
    );
  }
}
