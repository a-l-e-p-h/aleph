const audioDevices = [];

const s = (s) => {
  s.setup = () => {
    const input = new p5.AudioIn();

    input.getSources((devices) => {
      devices.forEach((device) => {
        const { deviceId, label } = device;
        audioDevices.push({
          key: deviceId,
          text: label,
        });
      });
    });
  };
};

new p5(s);

export default audioDevices;
