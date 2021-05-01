import { css } from "lit";
import { hex2rgba } from "../../../../utils/browserUtils";

import theme from "../../../globalStyles/theme";

const knobStyles = css`
  .knob-background {
    fill: none;
    stroke: ${hex2rgba(theme.colors.black, 0.5)};
  }

  .knob-value {
    transform: rotate(90deg);
    fill: none;
    transform-origin: center;
  }

  .dragging {
    cursor: grabbing !important;
  }

  svg:hover {
    cursor: grab;
  }
`;

export default knobStyles;
