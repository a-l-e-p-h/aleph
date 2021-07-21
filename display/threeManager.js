// import * as THREE from "three"
const { ipcRenderer } = require("electron");
const path = require("path");

class ThreeManager {
  constructor() {
    this.camera = null;
    this.renderer = null;
    this.cameraParams = null;
    this.scenes = [];
    this.selectedScene = null;
  }

  init(canvas) {
    ipcRenderer.send("request-three-sketches");
    ipcRenderer.once("three-sketch-list", (e, sketches) => {
      sketches.forEach((sketch) => {
        const sketchName = path.basename(sketch);
        this.scenes[sketchName] = require(sketch);
      });
      console.log(this.scenes)
    })

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

  addScene(scene) {
    this.scenes.push(scene);
  }

  selectScene(sceneIndex) {
    if (this.scenes[sceneIndex]) {
      this.selectedScene = new this.scenes[sceneIndex](
        this.renderer,
        this.camera
      );
    }
  }

  render() {
    this.selectedScene.draw(this.renderer, this.camera);
  }
}

const three = new ThreeManager();
three.init();