const sketch2 = (s, audio) => {
  const colorIntensity = s.map(audio.spectralCentroid, 0, 20000, 255, 0);
  s.background(0, colorIntensity * 2);
  s.fill(50, 0, colorIntensity);
  s.noStroke();
  for (let i = 0; i < audio.spectrum?.length; i++) {
    let width = s.windowWidth / audio.spectrum?.length;
    let x = width * i;
    let height = audio.waveform[i] * 1024;
    s.stroke(255 - audio.waveform[i]);
    s.rect(x, s.windowHeight * 0.5, width, height);
  }
  s.fill(255, colorIntensity);
};

module.exports = sketch2;
