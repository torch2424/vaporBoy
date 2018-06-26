export const WASMBOY_CONFIG = {
  isGbcEnabled: true,
  isAudioEnabled: true,
  frameSkip: 1,
  audioBatchProcessing: true,
  timersBatchProcessing: false,
  audioAccumulateSamples: true,
  graphicsBatchProcessing: false,
  graphicsDisableScanlineRendering: false,
  tileRendering: true,
  tileCaching: true,
  gameboyFrameRate: 60,
  saveStateCallback: saveStateObject => {
    // Function called everytime a savestate occurs
    // Used by the WasmBoySystemControls to show screenshots on save states
    const canvasElement = document.getElementById("wasmboy-canvas");
    if (canvasElement) {
      saveStateObject.screenshotCanvasDataURL = canvasElement.toDataURL();
    }
  }
};
