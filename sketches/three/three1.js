function scene1(renderer, camera) {
  this.renderer = renderer;
  this.camera = camera;
  this.scene = new THREE.Scene();
  this.geometry = new THREE.BoxGeometry();
  this.material = new THREE.MeshNormalMaterial();
  this.cube = new THREE.Mesh(this.geometry, this.material);
  this.scene.add(this.cube);

  this.draw = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.015;
    requestAnimationFrame(this.draw);
    this.renderer.render(this.scene, this.camera); // specify canvas here?
  };
}

module.exports = scene1;
