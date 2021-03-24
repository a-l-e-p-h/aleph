const { ipcRenderer } = require("electron");
const path = require("path");

const sketch = (s) => {
  let audio = {};
  const sketches = {};
  let currentSketch = () => {};

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.rectMode(s.CENTER);

    ipcRenderer.on("audio-features", (event, audioFeatures) => {
      audio = audioFeatures;
    });

    ipcRenderer.on("sketch-changed", (event, sketchName) => {
      console.log("selected", sketchName);
      currentSketch = sketches[sketchName];
    });

    ipcRenderer.send("request-sketches");

    ipcRenderer.once("sketch-list", (event, sketchList) => {
      console.log("attempting to write sketch paths...");
      console.log(sketchList);
      sketchList.forEach((sketch) => {
        const sketchName = path.basename(sketch);
        sketches[sketchName] = require(sketch);
      });

      console.log(sketches);
    });
  };

  s.draw = () => {
    currentSketch(s, audio);
  };
};

new p5(sketch, document.getElementById("p5_2"));
