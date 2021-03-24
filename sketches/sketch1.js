const sketch1 = (s, audio) => {
  const colorIntensity = s.map(audio.spectralCentroid, 0, 20000, 0, 255);
  s.background(0, colorIntensity * 2);
  s.fill(50, 0, colorIntensity);
  s.rect(s.windowWidth / 2, s.windowHeight / 2, audio.mid * 8, audio.high * 2);
  for (let i = 0; i < audio.waveform?.length; i++) {
    let width = s.windowWidth / audio.waveform?.length;
    let x = width * i;
    let height = audio.waveform[i] * 512;
    s.fill(255 - audio.waveform[i] * 255);
    s.rect(x, s.windowHeight * 0.5, width, height);
  }
  s.fill(colorIntensity, 0, 50);
  s.rect(s.windowWidth / 2, s.windowHeight / 2, audio.bass, audio.mid);
};

module.exports = sketch1;
