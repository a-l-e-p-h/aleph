import { css } from "lit-element";

/**
 * Converts a given hex color to an rgba color with the given opacity. Processed by
 * litelement's css helper to return a valid CSSResult.
 *
 * @param {String} hex - hex color code
 * @param {Number} alpha - 0-1 number representing the desired opacity
 * @returns {CSSResult} litelement css rgba representation
 */
const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.cssText.match(/\w\w/g).map((x) => parseInt(x, 16));
  return css`rgba(${r},${g},${b},${alpha})`;
};

export default hex2rgba;
