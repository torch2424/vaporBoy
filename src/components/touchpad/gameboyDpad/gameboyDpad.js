// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

export default class GameboyDpad extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <div class="gameboy-dpad">
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

        <svg viewBox="0 0 189 189" xmlns="http://www.w3.org/2000/svg">
          {/* The Dpad Background */}
          <path
            d="M58,58 L58,8.00037538 C58,3.5859394 61.5833386,0 66.0036109,0 L122.996389,0 C127.417239,0 131,3.58189007 131,8.00037538 L131,58 L180.999625,58 C185.414061,58 189,61.5833386 189,66.0036109 L189,122.996389 C189,127.417239 185.41811,131 180.999625,131 L131,131 L131,180.999625 C131,185.414061 127.416661,189 122.996389,189 L66.0036109,189 C61.5827606,189 58,185.41811 58,180.999625 L58,131 L8.00037538,131 C3.5859394,131 0,127.416661 0,122.996389 L0,66.0036109 C0,61.5827606 3.58189007,58 8.00037538,58 L58,58 Z"
            fill="url(#ButtonBackgroundFill)"
          />

          {/* Dpad Triangles */}
          {/* Up */}
          <polygon points="75,45 115,45 95,10" />
          {/* Down */}
          <polygon points="75,145 115,145 95,180" />
          {/* Left */}
          <polygon points="10,95 45,115 45,75" />
          {/* Right */}
          <polygon points="180,95 145,115 145,75" />
        </svg>
      </div>
    );
  }
}
