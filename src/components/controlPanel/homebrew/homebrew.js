import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import Cartridge from "../cartridge/cartridge";

import { AVAILABLE_GAMES } from "./availableGames";

export default class Homebrew extends Component {
  constructor() {
    super();
    this.setState({});
  }

  loadROM(availableGame) {
    const loadHomebrewTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(availableGame.ROMPath);
      console.log("Wasmboy Ready!");
      await WasmBoy.play();
    };

    loadHomebrewTask();
    this.props.hide();
  }

  render() {
    let homebrewROMs = [];
    AVAILABLE_GAMES.forEach(game => {
      homebrewROMs.push(
        <li class="ROM-list__item">
          <div class="ROM-list__item__cartridge">
            <Cartridge
              imageUrl={game.imagePath}
              onClick={() => {
                this.loadROM(game);
              }}
            />
          </div>
          <div class="ROM-list__item__label">
            <a href={game.link} target="_blank">
              {game.title}
            </a>
          </div>
        </li>
      );
    });

    return (
      <div>
        <ul class="ROM-list">{homebrewROMs}</ul>
      </div>
    );
  }
}