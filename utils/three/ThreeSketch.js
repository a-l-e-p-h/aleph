const { ipcRenderer } = require("electron");

class ThreeSketch {
  constructor(renderer, camera) {
    this.renderer = renderer;
    this.camera = camera;
    this.audio = {
      bass: 0,
      mid: 0,
      high: 0,
      volume: 0,
      volumeLeft: 0,
      volumeRight: 0,
      spectrum: [],
      waveform: [],
      spectralCentroid: [],
    };
    this.analyze();
  }

  analyze() {
    ipcRenderer.on("audio-features", (_, audioFeatures) => {
      this.audio = audioFeatures;
    });
  }
}

module.exports = ThreeSketch;
