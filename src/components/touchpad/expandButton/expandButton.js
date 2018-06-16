// Desktop Layout for vaporboy
import { Component } from "preact";

export default class ExpandButton extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {}

  render() {
    return (
      <button class="expand-button" onClick={() => this.props.onClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            class="expand-button__icon"
            d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
          />
        </svg>
      </button>
    );
  }
}
