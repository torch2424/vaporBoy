import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import Cartridge from "../cartridge/cartridge";

export default class MyCollection extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    // Get our pubx states
    const pubxCollectionState = Pubx.get(PUBX_CONFIG.ROM_COLLECTION_KEY);
    const pubxControlPanelState = Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY);

    this.setState({
      collection: {
        ...pubxCollectionState
      },
      controlPanel: {
        ...pubxControlPanelState
      }
    });
  }

  getROMImageUrl(collectionROM) {
    return undefined;
  }

  getROMTitle(collectionROM) {
    return collectionROM.titleAsString;
  }

  loadROM(collectionROM) {
    const loadROMTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(collectionROM.ROM);
      console.log("Wasmboy Ready!");
      await WasmBoy.play();
    };

    loadROMTask();
    this.state.controlPanel.hideControlPanel();
  }

  render() {
    let collectionROMs = [];
    if (this.state.collection && this.state.collection.collection) {
      Object.keys(this.state.collection.collection).forEach(
        collectionROMKey => {
          const collectionROM = this.state.collection.collection[
            collectionROMKey
          ];

          collectionROMs.push(
            <li class="ROM-list__item">
              <div class="ROM-list__item__cartridge">
                <Cartridge
                  imageUrl={this.getROMImageUrl(collectionROM)}
                  onClick={() => {
                    this.loadROM(collectionROM);
                  }}
                />
              </div>
              <div class="ROM-list__item__label">
                {this.getROMTitle(collectionROM)}
              </div>
            </li>
          );
        }
      );
    }

    return (
      <div>
        <ul class="ROM-list">{collectionROMs}</ul>
      </div>
    );
  }
}
