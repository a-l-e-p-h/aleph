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

      ipcRenderer.on(
        "mix-blend-mode-updated",
        (event, serializedBlendModeUpdate) => {
          const blendModeUpdate = JSON.parse(serializedBlendModeUpdate);
          if (blendModeUpdate.layer === layerIndex) {
            // find target canvas
            const canvas = document.getElementById(`p5-${layerIndex}`);
            // update blend mode
            canvas.style.mixBlendMode = blendModeUpdate.blendMode;
          }
        }
      );

      ipcRenderer.on(
        "layer-opacity-updated",
        (event, serializedOpacityUpdate) => {
          const opacityUpdate = JSON.parse(serializedOpacityUpdate);
          if (opacityUpdate.layer === layerIndex) {
            // find target canvas
            const canvas = document.getElementById(`p5-${layerIndex}`);
            // update blend mode
            canvas.style.opacity = opacityUpdate.opacity * 0.01;
          }
        }
      );
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

const p5Layers = document.querySelectorAll(".p5-canvas");

p5Layers.forEach((layer, index) => {
  const sketchLayer = p5Handler(index);
  new p5(sketchLayer, document.getElementById(`p5-${index}`));
});
