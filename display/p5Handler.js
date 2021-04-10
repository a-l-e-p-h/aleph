const { ipcRenderer } = require("electron");
const path = require("path");

const sketch0 = (s) => {
  let cnv;
  let audio = {};
  const sketches = {};
  let currentSketch = () => {};

  s.setup = () => {
    cnv = s.createCanvas(s.windowWidth, s.windowHeight);

    ipcRenderer.on("audio-features", (event, audioFeatures) => {
      audio = audioFeatures;
    });

    ipcRenderer.on("sketch-changed", (event, serializedLayers) => {
      const layers = JSON.parse(serializedLayers);
      currentSketch = sketches[layers[0].selectedSketch];
      localStorage.setItem("lastSketch0", layers[0].selectedSketch);
      s.resetStyles();
    });

    ipcRenderer.send("request-sketches");

    ipcRenderer.once("sketch-list", (event, sketchList) => {
      // import sketches
      sketchList.forEach((sketch) => {
        const sketchName = path.basename(sketch);
        sketches[sketchName] = require(sketch);
      });

      // check for prev. loaded sketch
      const lastSketch = localStorage.getItem("lastSketch0");
      if (lastSketch) currentSketch = sketches[lastSketch];
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

const sketch1 = (s) => {
  let cnv;
  let audio = {};
  const sketches = {};
  let currentSketch = () => {};

  s.setup = () => {
    cnv = s.createCanvas(s.windowWidth, s.windowHeight);

    ipcRenderer.on("audio-features", (event, audioFeatures) => {
      audio = audioFeatures;
    });

    ipcRenderer.on("sketch-changed", (event, serializedLayers) => {
      const layers = JSON.parse(serializedLayers);
      currentSketch = sketches[layers[1].selectedSketch];
      console.log(layers);
      localStorage.setItem("lastSketch1", layers[1].selectedSketch);
      s.resetStyles();
    });

    ipcRenderer.send("request-sketches");

    ipcRenderer.once("sketch-list", (event, sketchList) => {
      // import sketches
      sketchList.forEach((sketch) => {
        const sketchName = path.basename(sketch);
        sketches[sketchName] = require(sketch);
      });

      // check for prev. loaded sketch
      const lastSketch = localStorage.getItem("lastSketch1");
      if (lastSketch) currentSketch = sketches[lastSketch];
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

new p5(sketch0, document.getElementById("p5_0"));
new p5(sketch1, document.getElementById("p5_1"));
