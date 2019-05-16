// Our available options and their types
// https://github.com/torch2424/wasmBoy/wiki/%5BWIP%5D-Lib-API#wasmboyoptions
export const VAPORBOY_OPTION_SECTIONS = {
  gameplay: {
    name: "Gameplay",
    descriptionElement: (
      <div>Options pertaining to the actual experience of playing the ROM</div>
    ),
    settings: {
      isGbcEnabled: {
        name: "Use GBC When Optional",
        descriptionElement: (
          <div>
            Some ROMS have a flag in the cartridge header, indicating they can
            be played in a "GB" or "GBC" mode. This will play those ROMs in the
            "GBC" mode.
          </div>
        ),
        type: "boolean"
      },
      isGbcColorizationEnabled: {
        name: "Use GBC Colorization of GB games",
        descriptionElement: (
          <div>
            Some GameBoy ROMS have a header, that when computed by a hash by a
            GameBoy Color will enable a colorized palette of the GameBoy ROM.
            This will play GameBoy games with their intended GameBoy Color
            palette.
          </div>
        ),
        type: "boolean"
      },
      isAudioEnabled: {
        name: "Enable Audio",
        descriptionElement: <div>Enable/Disable Audio Output</div>,
        type: "boolean"
      }
    }
  },
  interface: {
    name: "Interface",
    descriptionElement: (
      <div>Options pertaining to the Interface of vaporboy.</div>
    ),
    settings: {
      hideGamepadInExpandedMode: {
        name: "Hide Gamepad In Expanded Mode",
        descriptionElement: (
          <div>
            This will force hiding the gamepad in the expanded mode. This is
            useful when, using a gamepad on mobile.
          </div>
        ),
        type: "boolean"
      }
    }
  },
  performance: {
    name: "Performance",
    descriptionElement: (
      <div>
        Options that pertain to the speed/performance of emulating a ROM. These
        options will vary performance on a wide range, at the sacrafice of
        emulation accuracy. Meaning these options can cause bugs and crashes
        within emulation. For a breakdown of general performance gains, please
        see the current <span />
        <a
          href="https://github.com/torch2424/wasmBoy/blob/master/test/performance/results.md"
          target="_blank"
        >
          WasmBoy performance tests
        </a>.
      </div>
    ),
    settings: {
      gameboyFrameRate: {
        name: "Maximum Framerate",
        descriptionElement: (
          <div>
            This will determine how many frames will be attempted to run per
            second. This can make the game run slower, or faster, and can be
            used a emulation speed option. For instance, setting the "Maximum
            Framerate" to 120, will make a game run twice as fast. Though, some
            devices will not be able to acheive this value, and will give
            varying results.
          </div>
        ),
        type: "integer",
        min: 0,
        max: 400
      },
      frameSkip: {
        name: "Frame Skip",
        descriptionElement: (
          <div>
            This defines how many frames will be skipped in the output phase.
            For instance, the frame will still be run and rendered, but simply
            will not be output to the canvas element.
          </div>
        ),
        type: "integer",
        min: 0,
        max: 60
      },
      audioBatchProcessing: {
        name: "Audio Batch Processing",
        descriptionElement: (
          <div>
            This will avoid updating the audio channels until they need to be
            for an event, out for requested output.
          </div>
        ),
        type: "boolean"
      },
      timersBatchProcessing: {
        name: "Timers Batch Processing",
        descriptionElement: (
          <div>
            This will avoid updating timers until they need to be updated. Then,
            timers will all be updated to their respecitve state to fufill the
            requirment.
          </div>
        ),
        type: "boolean"
      },
      audioAccumulateSamples: {
        name: "Accumulate Audio Samples",
        descriptionElement: (
          <div>
            This will assume the same audio is being output when there is no
            changes to any of the Audio channels on the Gameboy. Therefore, the
            audio samples will not be output until they change, and will simply
            output the same samples for as long as they have been the same.
          </div>
        ),
        type: "boolean"
      },
      graphicsBatchProcessing: {
        name: "Graphics Batch Processing",
        descriptionElement: (
          <div>
            This will avoid updating graphics until they need to be updated.
            Then, graphics will be update. This does not respect scanline
            rendering currently, and can lead to major graphical bugs in many
            games.
          </div>
        ),
        type: "boolean"
      },
      graphicsDisableScanlineRendering: {
        name: "Disable Scanline Rendering",
        descriptionElement: (
          <div>
            The gameboy draws graphics, one scanline at a time (horizontally),
            from top to bottom. This will simply calculate the frame at the
            final scanline. But this will break most scrolling in games.
          </div>
        ),
        type: "boolean"
      },
      tileRendering: {
        name: "Tile Rendering",
        descriptionElement: (
          <div>
            The Gameboy is display is made up of tiles. All graphics must be
            encoded in 8x8 tile and then drawn to a screen. When we draw
            scanlines, we will simply draw all 8 pixels and assume the tile will
            not shift horizontally when drawn (though this is possible to
            happen.
          </div>
        ),
        type: "boolean"
      },
      tileCaching: {
        name: "Tile Caching",
        descriptionElement: (
          <div>
            The Gameboy is display is made up of tiles. All graphics must be
            encoded in 8x8 tile and then drawn to a screen. Whenever we draw a
            line of a tile during the rendering of the scanline, we will cache
            that line of the tile. If the next tile is the same tile, we will
            simply copy over those 8 pixels, rather than recompute them for the
            tile.
          </div>
        ),
        type: "boolean"
      }
    }
  },
  debug: {
    name: "Debug",
    descriptionElement: (
      <div>Options that pertain to helping debug vaporboy/wasmboy.</div>
    ),
    settings: {
      showDebugMenu: {
        name: "Show Debug Menu",
        descriptionElement: (
          <div>
            Reveals a live updating (once per second) debug menu, with things
            like a FPS Counter.
          </div>
        ),
        type: "boolean"
      }
    }
  }
};
