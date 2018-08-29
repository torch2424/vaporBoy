import { Component } from "preact";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

export default class LoadingModal extends Component {
  constructor() {
    super();
    this.setState({});
  }

  render() {
    return <div class="loading-modal" />;
  }
}
