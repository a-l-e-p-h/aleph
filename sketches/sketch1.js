const sketch1 = (s) => {
  s.draw = () => {
    console.log("rendering sketch 1");
    s.background(0);
    s.fill(255, 0, 0);
    s.rect(s.windowWidth / 2, s.windowHeight / 2, 200, 200);
  };
};

module.exports = sketch1;
