// Desktop Layout for vaporboy
import { Component } from "preact";
import { WasmBoy } from "wasmboy";

import { Pubx } from "../../../services/pubx";
import { PUBX_CONFIG } from "../../../pubx.config";

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
    ],
    EXPANDED_SAFARI_STOP_OPACITY: ["0.5", "0.5"]
  },
  BUTTON_LETTER_FILL: {
    ID: "ButtonLetterFill",
    GBA_STOP_COLORS: ["#aeb4bb", "#f2f5fd"],
    GBC_STOP_COLORS: ["#1d252c", "#212931"],
    EXPANDED_STOP_COLORS: [
      "rgba(150, 150, 150, 0.25)",
      "rgba(150, 150, 150, 0.25)"
    ],
    EXPANDED_SAFARI_STOP_OPACITY: ["0.25", "0.25"]
  },
  BUTTON_LETTER_STROKE: {
    ID: "ButtonLetterStroke",
    GBA_STOP_COLORS: ["#aeb4bb", "#c2c8d6", "#f2f5fd"],
    GBC_STOP_COLORS: ["#1d252c", "#494f54", "#212931"],
    EXPANDED_STOP_COLORS: [
      "rgba(200, 200, 200, 0.25)",
      "rgba(200, 200, 200, 0.25)",
      "rgba(200, 200, 200, 0.25)"
    ],
    EXPANDED_SAFARI_STOP_OPACITY: ["0.25", "0.25", "0.25"]
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

// Stop Opacity is for Safari
// https://stackoverflow.com/questions/31729206
const getExpandedSafariStopOpacity = (
  gradientObject,
  stopOpacityIndex,
  isExpanded
) => {
  if (isExpanded) {
    return gradientObject.EXPANDED_SAFARI_STOP_OPACITY[stopOpacityIndex];
  }
  return "1.0";
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
    const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);

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
      gamepadId: gamepadId,
      layout: {
        ...pubxLayoutState
      }
    });
  }

  componentWillUnmount() {
    WasmBoy.removeTouchInput(this.state.keyMapButton, this.state.gamepadId);
  }

  isExpandedStartSelect(isExpanded) {
    return (
      (this.props.button === "start" || this.props.button === "select") &&
      isExpanded
    );
  }

  getButtonText(isExpanded) {
    if (this.props.button) {
      // Don't return if not expanded start/select
      if (
        (this.props.button === "start" || this.props.button === "select") &&
        !isExpanded
      ) {
        return "";
      }

      return this.props.button;
    }

    return "";
  }

  isExpandedStartSelect(isExpanded) {
    return (
      (this.props.button === "start" || this.props.button === "select") &&
      isExpanded
    );
  }

  getButtonTextX(isExpanded) {
    const defaultX = "25";

    if (this.isExpandedStartSelect(isExpanded)) {
      return "20";
    }

    return defaultX;
  }

  getButtonTextY(isExpanded) {
    const defaultY = "80";

    if (this.isExpandedStartSelect(isExpanded)) {
      return "85";
    }

    return defaultY;
  }

  render() {
    // Get if we are in specified modes, using pubx layout
    let isGba = false;
    let isGbc = false;
    let isExpanded = false;
    if (this.state.layout) {
      isGba = this.state.layout.isGba();
      isGbc = this.state.layout.isGbc();
      isExpanded = this.state.layout.isExpandedMobile();
    }

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
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_BACKGROUND_FILL,
                  0,
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
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_BACKGROUND_FILL,
                  1,
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
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_LETTER_FILL,
                  0,
                  isExpanded
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_LETTER_FILL,
                  1,
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_LETTER_FILL,
                  1,
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
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_LETTER_STROKE,
                  0,
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
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_LETTER_STROKE,
                  1,
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
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_LETTER_STROKE,
                  2,
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
            x={this.getButtonTextX(isExpanded)}
            y={this.getButtonTextY(isExpanded)}
            fill={`url(#${GRADIENTS.BUTTON_LETTER_FILL.ID})`}
            stroke={`url(#${GRADIENTS.BUTTON_LETTER_STROKE.ID})`}
          >
            {this.getButtonText(isExpanded)}
          </text>
        </svg>

        {externalText}
      </div>
    );
  }
}
