import { css } from "lit-element";

import theme from "../../../globalStyles/theme";

const knobStyles = css`
  .knob-background {
    fill: none;
    stroke: ${theme.colors.midGrey};
  }

  .knob-value {
    /* stroke: ${theme.colors.green}; */
    transform: rotate(90deg);
    fill: none;
    transform-origin: center;
  }

  svg:hover {
    cursor: pointer;
  }
`;

export default knobStyles;
