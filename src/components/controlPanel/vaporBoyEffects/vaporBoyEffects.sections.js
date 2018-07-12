// Our available options and their types
export const VAPORBOY_EFFECTS_SECTIONS = {
  audioVideo: {
    name: "Audio/Video",
    descriptionElement: (
      <div>Effects that modify boht audio and video output of the ROM.</div>
    ),
    settings: {
      vapor: {
        name: "Vapor Mode",
        descriptionElement: (
          <div>
            This will add some <i>A E S T H E T I C</i> to any ROM.
          </div>
        ),
        type: "boolean"
      }
    }
  },
  audio: {
    name: "Audio",
    descriptionElement: (
      <div>Options that pertain to audio output of the ROM.</div>
    ),
    settings: {
      bassBoost: {
        name: "Bass Boost",
        descriptionElement: <div>Bass Boost all ROM audio Output.</div>,
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
      crt: {
        name: "CRT Display",
        descriptionElement: (
          <div>Add a CRT like effect to the video output element.</div>
        ),
        type: "boolean"
      },
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
        descriptionElement: (
          <div>
            Randomizes every pixel to a certain color, based on the average RGB
            value. Essentially adds a rainbow static to the video output.
          </div>
        ),
        type: "boolean"
      }
    }
  }
};
