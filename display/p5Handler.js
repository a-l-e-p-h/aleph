const { ipcRenderer } = require("electron");
const path = require("path");

const p5Handler = (layerIndex) => {
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

      ipcRenderer.on("sketch-changed", (event, serializedLayers) => {
        const layers = JSON.parse(serializedLayers);
        const newSketch = sketches[layers[layerIndex].selectedSketch];

        // if layer is paused, set current to default/empty sketch
        if (!layers[layerIndex].isPlaying) {
          currentSketch = s.defaultSketch;
          localStorage.setItem(
            `lastSketch${layerIndex}`,
            JSON.stringify({
              sketch: layers[layerIndex].selectedSketch,
              isPlaying: false,
            })
          );
        }
        // only update if this layer has received a change
        else if (currentSketch !== newSketch) {
          currentSketch = newSketch;
          localStorage.setItem(
            `lastSketch${layerIndex}`,
            JSON.stringify({
              sketch: layers[layerIndex].selectedSketch,
              isPlaying: true,
            })
          );
          s.resetStyles();
        }
      });

      ipcRenderer.send("request-sketches");

      ipcRenderer.once("sketch-list", (event, sketchList) => {
        // import sketches
        sketchList.forEach((sketch) => {
          const sketchName = path.basename(sketch);
          sketches[sketchName] = require(sketch);
        });

        // check for prev. loaded sketch
        const lastSketch = JSON.parse(
          localStorage.getItem(`lastSketch${layerIndex}`)
        );
        if (lastSketch && lastSketch.isPlaying) {
          currentSketch = sketches[lastSketch.sketch];
        }
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

    s.defaultSketch = () => {
      s.clear();
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

  return sketch;
};

// const layer1 = p5Handler(0);
// const layer2 = p5Handler(1);

// new p5(layer1, document.getElementById("p5-0"));
// new p5(layer2, document.getElementById("p5-1"));

const p5Layers = document.querySelectorAll(".p5-canvas");

p5Layers.forEach((layer, index) => {
  const sketchLayer = p5Handler(index);
  new p5(sketchLayer, document.getElementById(`p5-${index}`));
});
