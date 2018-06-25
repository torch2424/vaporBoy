// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { getInputId } from "../touchpad.common";

// Define our gradient constants
const GRADIENTS = {
  BUTTON_BACKGROUND_FILL: {
    ID: "ButtonBackgroundFill",
    GBA_STOP_COLORS: ["#cdd5e1", "#f2f5fd"],
    GBC_STOP_COLORS: ["#494f54", "#212931"]
  },
  BUTTON_TRIANGLE_FILL_UP: {
    ID: "ButtonTriangleFillUp",
    GBA_STOP_COLORS: ["#f2f5fd", "#b4bec5"],
    GBC_STOP_COLORS: ["#494f54", "#212931"]
  },
  BUTTON_TRIANGLE_FILL_DOWN: {
    ID: "ButtonTriangleFillDown",
    GBA_STOP_COLORS: ["#b4bec5", "#f2f5fd"],
    GBC_STOP_COLORS: ["#494f54", "#212931"]
  },
  BUTTON_TRIANGLE_FILL_HORIZONTAL: {
    ID: "ButtonTriangleFillHorizontal",
    GBA_STOP_COLORS: ["#c9d1dc", "#c9d1dc", "#b0bac2"],
    GBC_STOP_COLORS: ["#494f54", "#1d252c", "#212931"]
  },
  BUTTON_TRIANGLE_STROKE: {
    ID: "ButtonTriangleStroke",
    GBA_STOP_COLORS: ["#aeb4bb", "#c2c8d6", "#f2f5fd"],
    GBC_STOP_COLORS: ["#494f54", "#1d252c", "#212931"]
  }
};

const getStopColor = (gradientObject, stopColorIndex, isGbc) => {
  if (isGbc) {
    return gradientObject.GBC_STOP_COLORS[stopColorIndex];
  }

  return gradientObject.GBA_STOP_COLORS[stopColorIndex];
};

export default class GameboyDpad extends Component {
  constructor() {
    super();

    this.setState({
      ...this.state,
      elementId: getInputId(),
      upGamepadId: undefined,
      downGamepadId: undefined,
      leftGamepadId: undefined,
      rightGamepadId: undefined
    });
  }

  componentDidMount() {
    const touchElement = document.getElementById(this.state.elementId);
    const upGamepadId = WasmBoy.addTouchInput("UP", touchElement, "DPAD", "UP");
    const downGamepadId = WasmBoy.addTouchInput(
      "DOWN",
      touchElement,
      "DPAD",
      "DOWN"
    );
    const leftGamepadId = WasmBoy.addTouchInput(
      "LEFT",
      touchElement,
      "DPAD",
      "LEFT"
    );
    const rightGamepadId = WasmBoy.addTouchInput(
      "RIGHT",
      touchElement,
      "DPAD",
      "RIGHT"
    );

    this.setState({
      ...this.state,
      upGamepadId: upGamepadId,
      downGamepadId: downGamepadId,
      leftGamepadId: leftGamepadId,
      rightGamepadId: rightGamepadId
    });
  }

  componentWillUnmount() {
    WasmBoy.removeTouchInput("UP", this.state.upGamepadId);
    WasmBoy.removeTouchInput("DOWN", this.state.downGamepadId);
    WasmBoy.removeTouchInput("LEFT", this.state.leftGamepadId);
    WasmBoy.removeTouchInput("RIGHT", this.state.rightGamepadId);
  }

  render() {
    // Get if we are in gbc mode
    const isGbc = !!this.props.isGbc;

    // get our classes
    const classes = ["gameboy-dpad"];

    if (isGbc) {
      classes.push("gameboy-dpad--is-gbc");
    }

    return (
      <div class={classes.join(" ")}>
        <svg
          id={this.state.elementId}
          viewBox="0 0 189 189"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id={GRADIENTS.BUTTON_BACKGROUND_FILL.ID}
              cx="0.5"
              cy="0.5"
              r="0.75"
              fx="0.5"
              fy="0.95"
            >
              <stop
                offset="0%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_BACKGROUND_FILL,
                  0,
                  isGbc
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_BACKGROUND_FILL,
                  1,
                  isGbc
                )}
              />
            </radialGradient>

            <linearGradient
              id={GRADIENTS.BUTTON_TRIANGLE_FILL_UP.ID}
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_UP,
                  0,
                  isGbc
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_UP,
                  1,
                  isGbc
                )}
              />
            </linearGradient>

            <linearGradient
              id={GRADIENTS.BUTTON_TRIANGLE_FILL_DOWN.ID}
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_DOWN,
                  0,
                  isGbc
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_DOWN,
                  1,
                  isGbc
                )}
              />
            </linearGradient>

            <linearGradient
              id={GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL.ID}
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL,
                  0,
                  isGbc
                )}
              />
              <stop
                offset="75%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL,
                  1,
                  isGbc
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL,
                  2,
                  isGbc
                )}
              />
            </linearGradient>

            <linearGradient
              id={GRADIENTS.BUTTON_TRIANGLE_STROKE.ID}
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_STROKE,
                  0,
                  isGbc
                )}
              />
              <stop
                offset="75%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_STROKE,
                  1,
                  isGbc
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_STROKE,
                  2,
                  isGbc
                )}
              />
            </linearGradient>
          </defs>

          {/* The Dpad Background */}
          <path
            d="M58,58 L58,8.00037538 C58,3.5859394 61.5833386,0 66.0036109,0 L122.996389,0 C127.417239,0 131,3.58189007 131,8.00037538 L131,58 L180.999625,58 C185.414061,58 189,61.5833386 189,66.0036109 L189,122.996389 C189,127.417239 185.41811,131 180.999625,131 L131,131 L131,180.999625 C131,185.414061 127.416661,189 122.996389,189 L66.0036109,189 C61.5827606,189 58,185.41811 58,180.999625 L58,131 L8.00037538,131 C3.5859394,131 0,127.416661 0,122.996389 L0,66.0036109 C0,61.5827606 3.58189007,58 8.00037538,58 L58,58 Z"
            fill={`url(#${GRADIENTS.BUTTON_BACKGROUND_FILL.ID})`}
          />

          {/* Dpad Triangles */}
          {/* Up */}
          <polygon
            points="75,45 115,45 95,10"
            fill={`url(#${GRADIENTS.BUTTON_TRIANGLE_FILL_UP.ID})`}
            stroke={`url(#${GRADIENTS.BUTTON_TRIANGLE_STROKE.ID})`}
          />
          {/* Down */}
          <polygon
            points="75,145 115,145 95,180"
            fill={`url(#${GRADIENTS.BUTTON_TRIANGLE_FILL_DOWN.ID})`}
            stroke={`url(#${GRADIENTS.BUTTON_TRIANGLE_STROKE.ID})`}
          />
          {/* Left */}
          <polygon
            points="10,95 46.5,115 45,75"
            fill={`url(#${GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL.ID})`}
            stroke={`url(#${GRADIENTS.BUTTON_TRIANGLE_STROKE.ID})`}
          />
          {/* Right */}
          <polygon
            points="180,95 143.5,115 145,75"
            fill={`url(#${GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL.ID})`}
            stroke={`url(#${GRADIENTS.BUTTON_TRIANGLE_STROKE.ID})`}
          />
        </svg>
      </div>
    );
  }
}
