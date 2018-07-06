import { Component } from "preact";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

export default class ConfirmationModal extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    const pubxConfirmationModalState = {
      show: false,
      title: "",
      text: "",
      confirmCallback: false,
      cancelCallback: false,
      showConfirmationModal: (
        title,
        contentElement,
        confirmCallback,
        cancelCallback
      ) => {
        Pubx.publish(PUBX_CONFIG.CONFIRMATION_MODAL_KEY, {
          show: true,
          title,
          contentElement,
          confirmCallback,
          cancelCallback
        });
      },
      hideConfirmationModal: () => {
        Pubx.publish(PUBX_CONFIG.CONFIRMATION_MODAL_KEY, {
          show: false,
          title: "",
          text: "",
          confirmCallback: false,
          cancelCallback: false
        });
      }
    };

    Pubx.publish(
      PUBX_CONFIG.CONFIRMATION_MODAL_KEY,
      pubxConfirmationModalState
    );

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
        ...pubxConfirmationModalState
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
        <button onClick={() => this.confirmButtonClick()}>OK</button>
      </div>
    ];
    if (this.state.confirmationModal.confirmCallback) {
      buttons.push(
        <div class="aesthetic-windows-95-button">
          <button onClick={() => this.cancelButtonClick()}>Cancel</button>
        </div>
      );
    }

    return (
      <div class="vaporboy-info-modal">
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
              <div class="vaporboy-info-modal__modal__content">
                {this.state.confirmationModal.contentElement}
              </div>
              <div class="vaporboy-info-modal__modal__buttons">{buttons}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
