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
    EXPANDED_STOP_COLORS: [
      "rgba(255, 255, 255, 0.5)",
      "rgba(255, 255, 255, 0.5)"
    ]
  },
  BUTTON_LETTER_FILL: {
    ID: "ButtonLetterFill",
    GBA_STOP_COLORS: ["#aeb4bb", "#f2f5fd"],
    GBC_STOP_COLORS: ["#1d252c", "#212931"],
    EXPANDED_STOP_COLORS: [
      "rgba(150, 150, 150, 0.25)",
      "rgba(150, 150, 150, 0.25)"
    ]
  },
  BUTTON_LETTER_STROKE: {
    ID: "ButtonLetterStroke",
    GBA_STOP_COLORS: ["#aeb4bb", "#c2c8d6", "#f2f5fd"],
    GBC_STOP_COLORS: ["#1d252c", "#494f54", "#212931"],
    EXPANDED_STOP_COLORS: [
      "rgba(200, 200, 200, 0.25)",
      "rgba(200, 200, 200, 0.25)",
      "rgba(200, 200, 200, 0.25)"
    ]
  }
};

const getStopColor = (gradientObject, stopColorIndex, isGbc, isExpanded) => {
  if (isGbc) {
    return gradientObject.GBC_STOP_COLORS[stopColorIndex];
  }

  if (isExpanded) {
    return gradientObject.EXPANDED_STOP_COLORS[stopColorIndex];
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
    // Get if we are in specified modes
    const isGba = !!this.props.isGba;
    const isGbc = !!this.props.isGbc;
    const isExpanded = !!this.props.isExpanded;

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
      let externalTextClass = "gameboy-button__external-text";
      if (isGbc) {
        externalTextClass += " gameboy-button__external-text--gbc";
      }
      if (isGba) {
        externalTextClass += " gameboy-button__external-text--gba";
      }
      if (isExpanded) {
        externalTextClass += " gameboy-button__external-text--expanded";
      }
      externalText = (
        <div class={externalTextClass}>{this.props.button.toUpperCase()}</div>
      );
    }

    // Get our button shape for start/select
    const buttonSize = {
      yPosition: "0",
      yRadius: "50%",
      height: 100
    };
    if (this.props.button === "start" || this.props.button === "select") {
      if (isGbc) {
        buttonSize.yPosition = "50";
        buttonSize.height = "50";
      }
      if (isGba) {
        // Stay default
      }
      if (isExpanded) {
        buttonSize.yPosition = "50";
        buttonSize.height = "50";
      }
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
                  isGbc,
                  isExpanded
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_BACKGROUND_FILL,
                  1,
                  isGbc,
                  isExpanded
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
                  isGbc,
                  isExpanded
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_FILL,
                  0,
                  isGbc,
                  isExpanded
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
                  isGbc,
                  isExpanded
                )}
              />
              <stop
                offset="75%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_STROKE,
                  1,
                  isGbc,
                  isExpanded
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_STROKE,
                  2,
                  isGbc,
                  isExpanded
                )}
              />
            </radialGradient>
          </defs>

          <rect
            x="0"
            y={buttonSize.yPosition}
            width="100"
            height={buttonSize.height}
            rx="50%"
            ry={buttonSize.yRadius}
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
