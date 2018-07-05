import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

import Cartridge from "../cartridge/cartridge";

import { AVAILABLE_GAMES } from "./availableGames";

export default class Homebrew extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    // Get our pubx states
    const pubxControlPanelState = Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY);

    this.setState({
      controlPanel: {
        ...pubxControlPanelState
      }
    });
  }

  loadROM(availableGame) {
    const loadHomebrewTask = async () => {
      await WasmBoy.pause();
      await WasmBoy.loadROM(availableGame.ROMPath);
      console.log("Wasmboy Ready!");
      await WasmBoy.play();
    };

    loadHomebrewTask();
    this.state.controlPanel.hideControlPanel();
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
