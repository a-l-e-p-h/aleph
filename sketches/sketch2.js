const sketch2 = (s) => {
  s.draw = () => {
    s.fill(0, 255, 0);
    s.rect(s.windowWidth / 2, s.windowHeight / 2, 200, 200);
  };
};

export default sketch2;
