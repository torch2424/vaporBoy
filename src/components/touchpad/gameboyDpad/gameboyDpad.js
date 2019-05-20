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
  BUTTON_TRIANGLE_FILL_UP: {
    ID: "ButtonTriangleFillUp",
    GBA_STOP_COLORS: ["#f2f5fd", "#b4bec5"],
    GBC_STOP_COLORS: ["#494f54", "#212931"],
    EXPANDED_STOP_COLORS: [
      "rgba(175, 175, 175, 0.25)",
      "rgba(175, 175, 175, 0.25)"
    ],
    EXPANDED_SAFARI_STOP_OPACITY: ["0.25", "0.25"]
  },
  BUTTON_TRIANGLE_FILL_DOWN: {
    ID: "ButtonTriangleFillDown",
    GBA_STOP_COLORS: ["#b4bec5", "#f2f5fd"],
    GBC_STOP_COLORS: ["#494f54", "#212931"],
    EXPANDED_STOP_COLORS: [
      "rgba(175, 175, 175, 0.25)",
      "rgba(175, 175, 175, 0.25)"
    ],
    EXPANDED_SAFARI_STOP_OPACITY: ["0.25", "0.25"]
  },
  BUTTON_TRIANGLE_FILL_HORIZONTAL: {
    ID: "ButtonTriangleFillHorizontal",
    GBA_STOP_COLORS: ["#c9d1dc", "#c9d1dc", "#b0bac2"],
    GBC_STOP_COLORS: ["#494f54", "#1d252c", "#212931"],
    EXPANDED_STOP_COLORS: [
      "rgba(175, 175, 175, 0.25)",
      "rgba(175, 175, 175, 0.25)",
      "rgba(175, 175, 175, 0.25)"
    ],
    EXPANDED_SAFARI_STOP_OPACITY: ["0.25", "0.25", "0.25"],
    EXPANDED_SAFARI_STOP_OPACITY: ["0.25", "0.25", "0.25"]
  },
  BUTTON_TRIANGLE_STROKE: {
    ID: "ButtonTriangleStroke",
    GBA_STOP_COLORS: ["#aeb4bb", "#c2c8d6", "#f2f5fd"],
    GBC_STOP_COLORS: ["#494f54", "#1d252c", "#212931"],
    EXPANDED_STOP_COLORS: [
      "rgba(175, 175, 175, 0.25)",
      "rgba(175, 175, 175, 0.25)",
      "rgba(175, 175, 175, 0.25)"
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

export default class GameboyDpad extends Component {
  constructor() {
    super();

    this.setState({
      ...this.state,
      elementId: getInputId()
    });
  }

  componentDidMount() {
    const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);

    const touchElement = document.getElementById(this.state.elementId);
    WasmBoy.ResponsiveGamepad.TouchInput.addDpadInput(touchElement, {
      allowMultipleDirections: false
    });

    this.setState({
      ...this.state,
      layout: {
        ...pubxLayoutState
      }
    });
  }

  componentWillUnmount() {
    // TODO: Allow removing touch inputs
    // https://github.com/torch2424/responsive-gamepad/issues/26
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
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_UP,
                  0,
                  isExpanded
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_UP,
                  1,
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_UP,
                  1,
                  isExpanded
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
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_DOWN,
                  0,
                  isExpanded
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_DOWN,
                  1,
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_DOWN,
                  1,
                  isExpanded
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
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL,
                  0,
                  isExpanded
                )}
              />
              <stop
                offset="75%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL,
                  1,
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL,
                  1,
                  isExpanded
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL,
                  2,
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_FILL_HORIZONTAL,
                  2,
                  isExpanded
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
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_STROKE,
                  0,
                  isExpanded
                )}
              />
              <stop
                offset="75%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_STROKE,
                  1,
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_STROKE,
                  1,
                  isExpanded
                )}
              />
              <stop
                offset="100%"
                stop-color={getStopColor(
                  GRADIENTS.BUTTON_TRIANGLE_STROKE,
                  2,
                  isGbc,
                  isExpanded
                )}
                stop-opacity={getExpandedSafariStopOpacity(
                  GRADIENTS.BUTTON_TRIANGLE_STROKE,
                  2,
                  isExpanded
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
