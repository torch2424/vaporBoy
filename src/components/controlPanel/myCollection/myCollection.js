import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import Cartridge from "../cartridge/cartridge";

export default class MyCollection extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {}

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
    this.props.hide();
  }

  render() {
    let collectionROMs = [];
    if (this.props.collection) {
      Object.keys(this.props.collection).forEach(collectionROMKey => {
        const collectionROM = this.props.collection[collectionROMKey];

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
      });
    }

    return (
      <div>
        <ul class="ROM-list">{collectionROMs}</ul>
      </div>
    );
  }
}
