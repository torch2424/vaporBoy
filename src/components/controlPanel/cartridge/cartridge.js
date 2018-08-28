import { Component } from "preact";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

export default class Cartridge extends Component {
  constructor() {
    super();
    this.setState({});
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    // All paths to vaporboys
    const vaporboys = [
      "assets/vaporboyarizona.png",
      "assets/vaporboybluebeach.png",
      "assets/vaporboyvhs.png"
    ];

    // Our cartridge content
    let cartridgeContent = (
      <div class="cartridge__content__centered-container__default-container">
        <img src={vaporboys[Math.floor(Math.random() * vaporboys.length)]} />
      </div>
    );

    if (this.props.imageUrl) {
      cartridgeContent = (
        <img
          class="cartridge__content__centered-container__image"
          src={this.props.imageUrl}
        />
      );
    } else if (this.props.text) {
      cartridgeContent = (
        <div class="cartridge__content__centered-container__text">
          {this.props.text}
        </div>
      );
    }

    // Our cartridge action
    let cartridgeAction = "";
    if (this.props.infoModalObject) {
      cartridgeAction = (
        <button
          class="list-button--info"
          onClick={() =>
            Pubx.get(PUBX_CONFIG.CONFIRMATION_MODAL_KEY).showConfirmationModal(
              this.props.infoModalObject
            )
          }
        >
          i
        </button>
      );
    } else if (this.props.editCallback) {
      <button
        class="list-button--edit"
        onClick={() => this.props.editCallback()}
      >
        ✏️
      </button>;
    }

    // Our cartridge overlay color
    let cartridgeOverlayColor = "grey";
    if (this.props.color) {
      cartridgeOverlayColor = this.props.color;
    }
    let cartridgeOverlayPath = `assets/cartridges/cartridge-${cartridgeOverlayColor}-blank.png`;

    return (
      <div class="cartridge">
        {/* Our Cartridge content */}
        <div class="cartridge__content">
          <div class="cartridge__content__centered-container">
            {cartridgeContent}
          </div>
        </div>

        {/* Our Cartridge overlay */}
        <button class="cartridge__overlay" onClick={() => this.onClick()}>
          <img src={cartridgeOverlayPath} />
        </button>
      </div>
    );
  }
}
