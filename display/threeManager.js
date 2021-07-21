// import * as THREE from "three"
const { ipcRenderer } = require("electron");
const path = require("path");

class ThreeManager {
  constructor(index) {
    this.layer = index;
    this.camera = null;
    this.renderer = null;
    this.cameraParams = null;
    this.sketches = {};
    this.selectedSketch = null;
  }

  init(canvas) {
    this.loadSketches();
    this.setupRenderer(canvas);
    this.onSceneChange();
  }

  loadSketches() {
    ipcRenderer.send("request-sketches");

    ipcRenderer.once("sketch-list", (e, sketches) => {
      sketches.three.forEach((sketch) => {
        const sketchName = path.basename(sketch);
        this.sketches[sketchName] = require(sketch);
      });
    });
  }

  setupRenderer(canvas) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  onSceneChange() {
    ipcRenderer.on("three-sketch-changed", (e, sketchUpdate) => {
      const { layer, layerIndex: updateLayer } = JSON.parse(sketchUpdate);

      if (this.layer === updateLayer) {
        this.selectScene(layer.selectedSketch);
      }
    });
  }

  selectScene(sceneName) {
    if (this.sketches[sceneName]) {
      this.selectedSketch = new this.sketches[sceneName](
        this.renderer,
        this.camera
      );
      this.render();
    }
  }

  render() {
    this.selectedSketch.draw(this.renderer, this.camera);
  }
}

const threeCanvases = document.querySelectorAll(".three-canvas");

threeCanvases.forEach((canvas, index) => {
  // offset index by 2 (the two p5 canvases)
  const three = new ThreeManager(index + 2);
  three.init(canvas);
});
