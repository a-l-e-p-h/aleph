const sketch1 = (s) => {
  s.draw = () => {
    s.fill(255, 0, 0);
    s.rect(s.windowWidth / 2, s.windowHeight / 2, 200, 200);
  };
};

export default sketch1;
