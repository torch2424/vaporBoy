// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { getInputId } from "../touchpad.common";

// Define our gradient constants
const GRADIENTS = {
  BUTTON_BACKGROUND_FILL: {
    ID: "ButtonBackgroundFill",
    GBA_STOP_COLORS: ["#cdd5e1", "#f2f5fd"],
    GBC_STOP_COLORS: ["#494f54", "#212931"],
    EXPANDED_STOP_COLORS: ["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.5)"]
  },
  BUTTON_LETTER_FILL: {
    ID: "ButtonLetterFill",
    GBA_STOP_COLORS: ["#aeb4bb", "#f2f5fd"],
    GBC_STOP_COLORS: ["#1d252c", "#212931"],
    EXPANDED_STOP_COLORS: ["rgba(0, 0, 0, 0.25)", "rgba(0, 0, 0, 0.25)"]
  },
  BUTTON_LETTER_STROKE: {
    ID: "ButtonLetterStroke",
    GBA_STOP_COLORS: ["#aeb4bb", "#c2c8d6", "#f2f5fd"],
    GBC_STOP_COLORS: ["#1d252c", "#494f54", "#212931"],
    EXPANDED_STOP_COLORS: ["rgba(0, 0, 0, 0.25)", "rgba(0, 0, 0, 0.25)"]
  }
};

const getStopColor = (gradientObject, stopColorIndex, isGbc) => {
  if (isGbc) {
    return gradientObject.GBC_STOP_COLORS[stopColorIndex];
  }

  return gradientObject.GBA_STOP_COLORS[stopColorIndex];
};

export default class GameboyButton extends Component {
  constructor() {
    super();

    this.setState({
      ...this.state,
      elementId: getInputId(),
      keyMapButton: undefined,
      gamepadId: undefined
    });
  }

  componentDidMount() {
    // Get our button
    const keyMapButton = this.props.button.toUpperCase();
    const touchElement = document.getElementById(this.state.elementId);
    const gamepadId = WasmBoy.addTouchInput(
      keyMapButton,
      touchElement,
      "BUTTON"
    );

    this.setState({
      ...this.state,
      keyMapButton: keyMapButton,
      gamepadId: gamepadId
    });
  }

  componentWillUnmount() {
    WasmBoy.removeTouchInput(this.state.keyMapButton, this.state.gamepadId);
  }

  getButtonText() {
    if (
      this.props.button &&
      this.props.button !== "start" &&
      this.props.button !== "select"
    ) {
      return this.props.button;
    }

    return "";
  }

  render() {
    // Get if we are in gbc mode
    const isGbc = !!this.props.isGbc;

    // get our classes
    const classes = ["gameboy-button"];

    if (isGbc) {
      classes.push("gameboy-button--is-gbc");
    }

    if (this.props.button === "start" || this.props.button === "select") {
      classes.push("gameboy-button--" + this.props.button);
    }

    const isGbcStartButton =
      isGbc &&
      (this.props.button === "start" || this.props.button === "select");

    // Find if we have External Text
    let externalText = "";
    if (this.props.button === "start" || this.props.button === "select") {
      externalText = (
        <div
          class={
            isGbc
              ? "gameboy-button__external-text--gbc"
              : "gameboy-button__external-text--gba"
          }
        >
          {this.props.button.toUpperCase()}
        </div>
      );
    }

    return (
      <div class={classes.join(" ")}>
        <svg
          id={this.state.elementId}
          viewBox="0 0 100 100"
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

            <radialGradient
              id={GRADIENTS.BUTTON_LETTER_FILL.ID}
              cx="0.5"
              cy="0.5"
              r="0.75"
              fx="0.5"
              fy="0.95"
            >
              <stop
                offset="0%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_FILL,
                  0,
                  isGbc
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_FILL,
                  0,
                  isGbc
                )}
              />
            </radialGradient>

            <radialGradient
              id={GRADIENTS.BUTTON_LETTER_STROKE.ID}
              cx="0.5"
              cy="0.5"
              r="0.75"
              fx="0.5"
              fy="0.75"
            >
              <stop
                offset="0%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_STROKE,
                  0,
                  isGbc
                )}
              />
              <stop
                offset="75%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_STROKE,
                  1,
                  isGbc
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_STROKE,
                  2,
                  isGbc
                )}
              />
            </radialGradient>
          </defs>

          <ellipse
            cx="50"
            cy="50"
            rx="49"
            ry={isGbcStartButton ? "24" : "49"}
            fill={`url(#${GRADIENTS.BUTTON_BACKGROUND_FILL.ID})`}
          />
          <text
            x="25"
            y="80"
            fill={`url(#${GRADIENTS.BUTTON_LETTER_FILL.ID})`}
            stroke={`url(#${GRADIENTS.BUTTON_LETTER_STROKE.ID})`}
          >
            {this.getButtonText()}
          </text>
        </svg>

        {externalText}
      </div>
    );
  }
}
