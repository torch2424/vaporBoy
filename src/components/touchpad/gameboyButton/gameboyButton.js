// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

export default class GameboyButton extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  getButtonText() {
    if (this.props.button) {
      return this.props.button;
    }

    return "";
  }

  render() {
    return (
      <div class="gameboy-button">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient
              id="ButtonBackgroundFill"
              cx="0.5"
              cy="0.5"
              r="0.75"
              fx="0.5"
              fy="0.95"
            >
              <stop offset="0%" stop-color="#cdd5e1" />
              <stop offset="100%" stop-color="#f2f5fd" />
            </radialGradient>

            <radialGradient
              id="ButtonLetterFill"
              cx="0.5"
              cy="0.5"
              r="0.75"
              fx="0.5"
              fy="0.95"
            >
              <stop offset="0%" stop-color="#aeb4bb" />
              <stop offset="100%" stop-color="#f2f5fd" />
            </radialGradient>

            <radialGradient
              id="ButtonLetterStroke"
              cx="0.5"
              cy="0.5"
              r="0.75"
              fx="0.5"
              fy="0.75"
            >
              <stop offset="0%" stop-color="#aeb4bb" />
              <stop offset="75%" stop-color="#c2c8d6" />
              <stop offset="100%" stop-color="#f2f5fd" />
            </radialGradient>
          </defs>

          <circle cx="50" cy="50" r="49" fill="url(#ButtonBackgroundFill)" />
          <text
            x="25"
            y="80"
            fill="url(#ButtonLetterFill)"
            stroke="url(#ButtonLetterStroke)"
          >
            {this.getButtonText()}
          </text>
        </svg>
      </div>
    );
  }
}
