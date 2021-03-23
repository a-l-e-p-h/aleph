const sketch2 = (s) => {
  s.draw = () => {
    console.log("rendering sketch 2");
    s.background(0);
    s.fill(0, 255, 0);
    s.rect(s.windowWidth / 2, s.windowHeight / 2, 200, 200);
  };
};

module.exports = sketch2;
