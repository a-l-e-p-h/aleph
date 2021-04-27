import { css } from "lit";

import theme from "../../../globalStyles/theme";

const knobStyles = css`
  .knob-background {
    fill: none;
    stroke: ${theme.colors.darkGrey};
  }

  .knob-value {
    transform: rotate(90deg);
    fill: none;
    transform-origin: center;
  }

  svg:hover {
    cursor: pointer;
  }
`;

export default knobStyles;
