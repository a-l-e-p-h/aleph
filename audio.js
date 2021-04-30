// import { ipcRenderer as ipc } from "electron"; // not working for some reason?
import { read, sub } from "@stoxy/core";
import { clamp } from "./utils/browserUtils";
const { ipcRenderer } = require("electron");

const audioDevices = [];

const audioAnalysis = (s) => {
  let fft,
    amplitude,
    params = [];

  s.setup = () => {
    const input = new p5.AudioIn();
    read("audio").then((data) => (params = data.params));
    sub("audio", ({ data }) => (params = data.params));

    input.getSources((devices) => {
      devices.forEach((device, index) => {
        const { deviceId, label } = device;
        audioDevices.push({
          key: index,
          text: label,
          deviceId,
        });
      });
    });

    amplitude = new p5.Amplitude();
    amplitude.setInput(input);

    fft = new p5.FFT();
    fft.setInput(input);

    document.addEventListener("audioDeviceSelected", ({ detail: device }) => {
      // kill any active and update source
      input.stop();
      input.setSource(device.index);
      input.start();
    });

    const requestAudioDeviceRefresh = new Event("requestAudioDeviceRefresh");
    document.dispatchEvent(requestAudioDeviceRefresh);
  };

  s.analyze = (params) => {
    const spectrum = fft.analyze();
    const waveform = fft.waveform();
    const bass = clamp(
      fft.getEnergy("bass") * (params[1].value * 0.02),
      0,
      255
    );
    const mid = clamp(fft.getEnergy("mid") * (params[2].value * 0.02), 0, 255);
    const high = clamp(fft.getEnergy("mid") * (params[3].value * 0.02), 0, 255);
    const spectralCentroid = fft.getCentroid();
    fft.smooth(params[4].value * 0.01); // doesn't appear to work in p5 1.2.0 :(

    const audio = {
      spectrum,
      waveform,
      bass,
      mid,
      high,
      spectralCentroid,
    };
    ipcRenderer.send("audio-features", audio);
  };

  s.draw = () => {
    s.analyze(params);
  };
};

new p5(audioAnalysis);

export default audioDevices;
