import { Component } from "preact";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

export default class Notification extends Component {
  constructor() {
    super();
    this.setState({
      ...this.state,
      notification: {},
      timeout: undefined
    });
  }

  componentDidMount() {
    const pubxNotificationSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.NOTIFICATION_KEY,
      newState => {
        if (!this.state.notification.isVisible && newState.isVisible) {
          // We need to show the notification
          this.showNotification();
        }

        // Finally set the state
        this.setState({
          ...this.state,
          notification: {
            ...this.state.notification,
            ...newState
          }
        });
      }
    );
  }

  componentWillUnmount() {
    // unsubscribe from the state
    Pubx.unsubscribe(
      PUBX_CONFIG.NOTIFICATION_KEY,
      this.state.pubxNotificationSubscriberKey
    );
  }

  showNotification() {
    // Set up a timeout to automitically hide the notification
    const timeout = setTimeout(() => {
      Pubx.publish(PUBX_CONFIG.NOTIFICATION_KEY, {
        isVisible: false
      });
    }, 7500);

    this.setState({
      ...this.state,
      timeout: timeout
    });
  }

  hideNotification() {
    clearTimeout(this.state.timeout);

    Pubx.publish(PUBX_CONFIG.NOTIFICATION_KEY, {
      isVisible: false
    });

    this.setState({
      ...this.state,
      timeout: false
    });
  }

  isActive() {
    if (this.state.notification.isVisible) {
      return "is-active";
    }

    return "";
  }

  render() {
    return (
      <div class="notification">
        <div class={`aesthetic-notification ${this.isActive()}`}>
          <button class="dismiss" onClick={() => this.hideNotification()}>
            X
          </button>
          <div class="aesthetic-notification-content">
            {this.state.notification.text}
          </div>
        </div>
      </div>
    );
  }
}
