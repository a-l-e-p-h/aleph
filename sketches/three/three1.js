const ThreeSketch = require("../../utils/three/ThreeSketch");

class MySketch extends ThreeSketch {
  constructor(renderer, camera) {
    super(renderer, camera);

    this.scene = new THREE.Scene();
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshNormalMaterial();
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
  }

  draw = () => {
    const scale = this.audio.bass * 0.00025;

    this.cube.rotation.x += scale;
    this.cube.rotation.y += scale;
    this.cube.scale.set(scale * 15, scale * 15, scale * 15);

    requestAnimationFrame(this.draw);
    this.renderer.render(this.scene, this.camera);
  };
}

module.exports = MySketch;
