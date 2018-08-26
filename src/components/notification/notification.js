import { Component } from "preact";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

export default class Notification extends Component {
  constructor() {
    super();
    this.setState({
      ...this.state,
      notification: {},
      isActiveClass: ""
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div class="notification">
        Ayyyeeee lmao
        <div class={`aesthetic-notification ${this.state.isActiveClass}`}>
          <button class="dismiss">X</button>
          <div class="aesthetic-notification-content">
            {this.state.notification.text}
          </div>
        </div>
      </div>
    );
  }
}
