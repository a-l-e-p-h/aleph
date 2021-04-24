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

      ipcRenderer.on("sketch-changed", (event, sketchUpdate) => {
        const { layer, layerIndex: updateLayer } = JSON.parse(sketchUpdate);

        if (updateLayer === layerIndex) {
          const newSketch = sketches[layer.selectedSketch];
          // if layer is paused, set current to default/empty sketch
          if (!layer.isPlaying) {
            currentSketch = s.defaultSketch;
            localStorage.setItem(`layer${layerIndex}`, JSON.stringify(layer));
          }
          // only update if this layer has received a change
          else if (currentSketch !== newSketch) {
            currentSketch = newSketch;
            localStorage.setItem(`layer${layerIndex}`, JSON.stringify(layer));
            s.resetStyles();
          }
        }
      });

      ipcRenderer.send("request-sketches");

      ipcRenderer.once("sketch-list", (event, sketchList) => {
        // import sketches
        sketchList.forEach((sketch) => {
          const sketchName = path.basename(sketch);
          sketches[sketchName] = require(sketch);
        });

        // check for cached layer data
        const layerCache = JSON.parse(
          localStorage.getItem(`layer${layerIndex}`)
        );
        if (layerCache && layerCache.isPlaying) {
          currentSketch = sketches[layerCache.selectedSketch];
        }
        // apply cached blend mode
        if (layerCache) {
          const canvas = document.getElementById(`p5-${layerIndex}`);
          canvas.style.mixBlendMode = layerCache.blendMode;
        }
      });

      ipcRenderer.on("mix-blend-mode-updated", (event, serializedLayer) => {
        const { layer } = JSON.parse(serializedLayer);
        if (layer.index === layerIndex) {
          // find target canvas
          const canvas = document.getElementById(`p5-${layerIndex}`);
          // update blend mode
          canvas.style.mixBlendMode = layer.blendMode;
          localStorage.setItem(`layer${layerIndex}`, JSON.stringify(layer));
        }
      });

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
