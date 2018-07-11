// Our available options and their types
export const VAPORBOY_EFFECTS_SECTIONS = {
  audioVideo: {
    name: "Audio/Video",
    descriptionElement: (
      <div>Effects that modify boht audio and video output of the ROM.</div>
    ),
    settings: {}
  },
  audio: {
    name: "Audio",
    descriptionElement: (
      <div>Options that pertain to audio output of the ROM.</div>
    ),
    settings: {
      bassBoost: {
        name: "Bass Boost",
        descriptionElement: <div>TODO: Right now it's a low pass filter</div>,
        type: "boolean"
      }
    }
  },
  video: {
    name: "Video",
    descriptionElement: (
      <div>Options that pertain to video output of the ROM.</div>
    ),
    settings: {
      monochrome: {
        name: "Monochrome Palette",
        descriptionElement: (
          <div>
            Force a Monochrome (greyscale) pallete on the ROM. For instance,
            Gameboy Color games will render in black and white.
          </div>
        ),
        type: "boolean"
      },
      inverted: {
        name: "Inverted Palette",
        descriptionElement: (
          <div>Invert the colors of the output video of the ROM.</div>
        ),
        type: "boolean"
      },
      rainbow: {
        name: "Rainbow Pallete",
        descriptionElement: <div>Rainbow TODO:</div>,
        type: "boolean"
      }
    }
  }
};
