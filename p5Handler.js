const { ipcRenderer } = require("electron");
const path = require("path");

const sketch = (s) => {
  let cnv;
  let audio = {};
  const sketches = {};
  let currentSketch = () => {};

  s.setup = () => {
    cnv = s.createCanvas(s.windowWidth, s.windowHeight);

    ipcRenderer.on("audio-features", (event, audioFeatures) => {
      audio = audioFeatures;
    });

    ipcRenderer.on("sketch-changed", (event, sketchName) => {
      currentSketch = sketches[sketchName];
      s.resetStyles();
    });

    ipcRenderer.send("request-sketches");

    ipcRenderer.once("sketch-list", (event, sketchList) => {
      sketchList.forEach((sketch) => {
        const sketchName = path.basename(sketch);
        sketches[sketchName] = require(sketch);
      });
    });
  };

  s.draw = () => {
    currentSketch(s, audio);
  };

  s.resetStyles = () => {
    s.clear();
    s.colorMode(s.RGB);
    s.stroke(0);
    s.fill(255);
    s.rectMode(s.CORNER);
    s.ellipseMode(s.CENTER);
    s.angleMode(s.RADIANS);
    s.blendMode(s.BLEND);
    s.imageMode(s.CORNER);
  };

  s.centerCanvas = () => {
    const x = (s.windowWidth - s.width) / 2;
    const y = (s.windowHeight - s.height) / 2;
    cnv.position(x, y);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    s.centerCanvas();
  };
};

new p5(sketch, document.getElementById("p5_2"));
