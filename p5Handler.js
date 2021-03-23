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
      currentSketch = sketches[sketchName](s);
      console.log(currentSketch);
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
    // const colorIntensity = s.map(audio.spectralCentroid, 0, 20000, 0, 255);
    // s.background(0, colorIntensity * 2);
    // s.fill(50, 0, colorIntensity);
    // s.rect(
    //   s.windowWidth / 2,
    //   s.windowHeight / 2,
    //   audio.mid * 8,
    //   audio.high * 2
    // );
    // for (let i = 0; i < audio.waveform?.length; i++) {
    //   let width = s.windowWidth / audio.waveform?.length;
    //   let x = width * i;
    //   let height = audio.waveform[i] * 512;
    //   s.fill(255 - audio.waveform[i] * 255);
    //   s.rect(x, s.windowHeight * 0.5, width, height);
    // }
    // s.fill(colorIntensity, 0, 50);
    // s.rect(s.windowWidth / 2, s.windowHeight / 2, audio.bass, audio.mid);
    currentSketch();
  };
};

new p5(sketch, document.getElementById("p5_2"));
