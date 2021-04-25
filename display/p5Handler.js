const { ipcRenderer } = require("electron");
const path = require("path");

const p5Handler = (layerIndex) => {
  const sketch = (s) => {
    let cnv;
    let audio = {};
    let currentSketch = () => {};
    const sketches = {};
    const canvas = document.getElementById(`p5-${layerIndex}`);

    s.setup = () => {
      cnv = s.createCanvas(s.windowWidth, s.windowHeight);

      ipcRenderer.on("audio-features", (_, audioFeatures) => {
        audio = audioFeatures;
      });

      ipcRenderer.on("sketch-changed", (_, sketchUpdate) => {
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

      ipcRenderer.once("sketch-list", (_, sketchList) => {
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
        // apply cached css properties
        if (layerCache) {
          canvas.style.mixBlendMode = layerCache.blendMode;
          canvas.style.opacity = layerCache.opacity;
          canvas.style.visibility = layerCache.visibility;
        }
      });

      ipcRenderer.on("mix-blend-mode-updated", (_, serializedLayer) => {
        s.updateCss("mixBlendMode", serializedLayer, layerIndex, canvas);
      });

      ipcRenderer.on("layer-opacity-updated", (_, serializedLayer) => {
        s.updateCss("opacity", serializedLayer, layerIndex, canvas);
      });

      ipcRenderer.on("layer-muted", (_, serializedLayer) => {
        s.updateCss("visibility", serializedLayer, layerIndex, canvas);
      });

      ipcRenderer.on("layer-soloed", (_, serializedLayers) => {
        const { layers } = JSON.parse(serializedLayers);

        layers.forEach((layer) =>
          s.updateCss("visibility", layer, layerIndex, canvas)
        );
      });
    };

    s.updateCss = (updateType, layerUpdate, currentLayerIndex, canvas) => {
      const layer =
        typeof layerUpdate === "string"
          ? JSON.parse(layerUpdate).layer
          : layerUpdate;

      if (layer.index === currentLayerIndex) {
        canvas.style[updateType] = layer[updateType];
        localStorage.setItem(
          `layer${currentLayerIndex}`,
          JSON.stringify(layer)
        );
      }
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
