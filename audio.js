// import { ipcRenderer as ipc } from "electron"; // not working for some reason?
const { ipcRenderer } = require("electron");

const audioDevices = [];

const audioAnalysis = (s) => {
  let fft, amplitude;

  s.setup = () => {
    const input = new p5.AudioIn();

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

    document.addEventListener(
      "audioDeviceSelected",
      ({ detail: deviceIndex }) => {
        // kill any active and update source
        input.stop();
        input.setSource(deviceIndex);
        input.start();
      }
    );

    const requestAudioDeviceRefresh = new Event("requestAudioDeviceRefresh");
    document.dispatchEvent(requestAudioDeviceRefresh);
  };

  s.analyze = () => {
    const spectrum = fft.analyze();
    const waveform = fft.waveform();
    const bass = fft.getEnergy("bass");
    const mid = fft.getEnergy("mid");
    const high = fft.getEnergy("treble");
    const spectralCentroid = fft.getCentroid();

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
    s.analyze();
  };
};

new p5(audioAnalysis);

export default audioDevices;
