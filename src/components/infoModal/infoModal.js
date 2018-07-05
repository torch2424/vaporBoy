import { Component } from "preact";

import { Pubx } from "../../services/pubx";
import { PUBX_CONFIG } from "../../pubx.config";

export default class WasmBoyCanvas extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    const pubxInfoModalState = {
      show: false,
      title: "",
      text: "",
      showInfoModal: (title, text) => {
        Pubx.publish(PUBX_CONFIG.INFO_MODAL_KEY, {
          show: true,
          title,
          text
        });
      },
      hideInfoModal: () => {
        Pubx.publish(PUBX_CONFIG.INFO_MODAL_KEY, {
          show: false,
          title: "",
          text: ""
        });
      }
    };

    Pubx.publish(PUBX_CONFIG.INFO_MODAL_KEY, pubxInfoModalState);

    Pubx.subscribe(PUBX_CONFIG.INFO_MODAL_KEY, newState => {
      this.setState({
        ...this.state,
        ...newState
      });
    });

    this.setState({
      ...pubxInfoModalState
    });
  }

  render() {
    if (!this.state.show) {
      return <div />;
    }

    return (
      <div class="vaporboy-info-modal">
        <div class="vaporboy-info-modal__modal">
          <div class="aesthetic-windows-95-modal">
            <div class="aesthetic-windows-95-modal-title-bar">
              <div class="aesthetic-windows-95-modal-title-bar-text">
                {this.state.title}
              </div>

              <div class="aesthetic-windows-95-modal-title-bar-controls">
                <div class="aesthetic-windows-95-button-title-bar">
                  <button onclick={() => this.state.hideInfoModal()}>X</button>
                </div>
              </div>
            </div>

            <div class="aesthetic-windows-95-modal-content">
              <div class="vaporboy-info-modal__modal__text">
                {this.state.text}
              </div>
              <div class="aesthetic-windows-95-button">
                <button onClick={() => this.state.hideInfoModal()}>OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
