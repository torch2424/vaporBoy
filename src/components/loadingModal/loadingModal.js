import { Component } from "preact";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

export default class LoadingModal extends Component {
  constructor() {
    super();
    this.setState({
      loading: {},
      isActiveClass: "",
      timeout: false
    });
  }

  componentDidMount() {
    const pubxLoadingSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.LOADING_KEY,
      newState => {
        // If we added a new promise to the stack, start loading
        if (
          this.state.loading.promiseStack.length < newState.promiseStack.length
        ) {
          this.startLoading(newState.promiseStack);
        }

        // Check if the promise stack was cleared
        if (newState.promiseStack.length <= 0) {
          this.stopLoading();
        }

        this.setState({
          ...this.state,
          loading: {
            ...this.state.loading,
            ...newState
          }
        });
      }
    );

    this.setState({
      loading: {
        ...Pubx.get(PUBX_CONFIG.LOADING_KEY)
      },
      pubxLoadingSubscriberKey
    });
  }

  componentWillUnmount() {
    Pubx.unsubscribe(
      PUBX_CONFIG.LOADING_KEY,
      this.state.pubxLoadingSubscriberKey
    );
  }

  startLoading(promiseStack) {
    // Check if we are not loading
    if (!this.state.timeout && !this.state.isActiveClass) {
      // Wait 400 milliseconds before showing the global loader.
      // 500 milliseconds is when an app starts to feel laggy
      this.setState({
        ...this.state,
        timeout: setTimeout(() => {
          this.setState({
            ...this.state,
            timeout: false,
            isActiveClass: "is-active"
          });
        }, 400)
      });
    }

    // Fire off stop loading once all of our promises resolve
    Promise.all(promiseStack).then(() => {
      this.stopLoading();
    });
  }

  stopLoading() {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      ...this.state,
      timeout: false,
      isActiveClass: ""
    });
  }

  render() {
    return (
      <div class={`loading-modal ${this.state.isActiveClass}`}>
        <div class="loading-modal__modal">
          <div class="aesthetic-windows-95-modal">
            <div class="aesthetic-windows-95-modal-title-bar">
              <div class="aesthetic-windows-95-modal-title-bar-text">
                Loading...
              </div>
            </div>

            <div class="aesthetic-windows-95-modal-content">
              <div class="aesthetic-windows-95-loader">
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
