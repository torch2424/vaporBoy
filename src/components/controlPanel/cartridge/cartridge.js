import { Component } from "preact";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import { getVaporBoyLogo } from "../../../vaporboyLogo";

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
    // Our cartridge content
    let cartridgeContent = (
      <div class="cartridge__content__centered-container__default-container">
        <img src={getVaporBoyLogo()} />
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
          aria-label="ROM Info"
        >
          i
        </button>
      );
    } else if (this.props.editCallback) {
      <button
        class="list-button--edit"
        onClick={() => this.props.editCallback()}
        aria-label="Edit ROM"
      >
        ✏️
      </button>;
    }

    // Our cartridge overlay color
    let cartridgeOverlayColor = "grey";
    if (this.props.color) {
      cartridgeOverlayColor = this.props.color;
    }
    let cartridgeOverlayPath = `assets/cartridges/512/cartridge-${cartridgeOverlayColor}-blank.png`;

    // Our cartridge aria
    let cartridgeAria = "";
    if (this.props.ariaLabel) {
      cartridgeAria = this.props.ariaLabel;
    }

    return (
      <div class="cartridge">
        {/* Our Cartridge content */}
        <div class="cartridge__content" aria-hidden="true">
          <div class="cartridge__content__centered-container">
            {cartridgeContent}
          </div>
        </div>

        {/* Our Cartridge overlay */}
        <button
          class="cartridge__overlay"
          onClick={() => this.onClick()}
          aria-label={`${cartridgeAria} Play ROM`}
        >
          <img src={cartridgeOverlayPath} />
        </button>
      </div>
    );
  }
}
