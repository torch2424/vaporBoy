import { Component } from "preact";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

export default class ConfirmationModal extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    const pubxConfirmationModalSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.CONFIRMATION_MODAL_KEY,
      newState => {
        this.setState({
          ...this.state,
          confirmationModal: {
            ...this.state.confirmationModal,
            ...newState
          }
        });
      }
    );

    this.setState({
      confirmationModal: {
        ...Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY)
      },
      pubxConfirmationModalSubscriberKey
    });
  }

  componentWillUnmount() {
    Pubx.unsubscribe(
      PUBX_CONFIG.CONFIRMATION_MODAL_KEY,
      this.state.pubxConfirmationModalSubscriberKey
    );
  }

  componentDidUpdate() {
    // Focus on our text [a11y]
    const focusElement = document.querySelector(".vaporboy-info-modal button");
    if (focusElement) {
      focusElement.focus();
    }
  }

  confirmButtonClick() {
    if (this.state.confirmationModal.confirmCallback) {
      this.state.confirmationModal.confirmCallback();
    }

    this.state.confirmationModal.hideConfirmationModal();
  }

  cancelButtonClick() {
    if (this.state.confirmationModal.cancelCallback) {
      this.state.confirmationModal.cancelCallback();
    }

    this.state.confirmationModal.hideConfirmationModal();
  }

  render() {
    if (!this.state.confirmationModal || !this.state.confirmationModal.show) {
      return <div />;
    }

    // Get our buttons for the confirmation
    const buttons = [
      <div class="aesthetic-windows-95-button">
        <button onClick={() => this.confirmButtonClick()}>
          {this.state.confirmationModal.confirmText}
        </button>
      </div>
    ];
    if (this.state.confirmationModal.confirmCallback) {
      buttons.push(
        <div class="aesthetic-windows-95-button">
          <button onClick={() => this.cancelButtonClick()}>
            {this.state.confirmationModal.cancelText}
          </button>
        </div>
      );
    }

    return (
      <div
        class="vaporboy-info-modal"
        role="dialog"
        aria-label={this.state.confirmationModal.title}
      >
        <div class="vaporboy-info-modal__modal">
          <div class="aesthetic-windows-95-modal">
            <div class="aesthetic-windows-95-modal-title-bar">
              <div class="aesthetic-windows-95-modal-title-bar-text">
                {this.state.confirmationModal.title}
              </div>

              <div class="aesthetic-windows-95-modal-title-bar-controls">
                <div class="aesthetic-windows-95-button-title-bar">
                  <button onclick={() => this.cancelButtonClick()}>X</button>
                </div>
              </div>
            </div>

            <div class="aesthetic-windows-95-modal-content">
              <p class="vaporboy-info-modal__modal__content">
                {this.state.confirmationModal.contentElement}
              </p>
              <div class="vaporboy-info-modal__modal__buttons">{buttons}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
