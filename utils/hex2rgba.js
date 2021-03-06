import { css } from "lit-element";

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.cssText.match(/\w\w/g).map((x) => parseInt(x, 16));
  return css`rgba(${r},${g},${b},${alpha})`;
};

export default hex2rgba;
