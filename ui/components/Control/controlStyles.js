import { css } from "lit";

import theme from "../../globalStyles/theme";

const controlStyles = css`
  label {
    font-family: Roboto Mono;
    font-size: 10px;
    color: ${theme.colors.white};
    margin-bottom: 5px;
    user-select: none;
  }

  input {
    display: none;
  }

  .fader {
    height: 200px;
    width: 16px;
    background: ${theme.gradients.vertical};
    border-radius: ${theme.measurements.borderRadius};
  }

  .fader:hover {
    cursor: pointer;
  }

  .fader-value {
    background: ${theme.colors.midGrey};
    border-radius: ${theme.measurements.borderRadius}
      ${theme.measurements.borderRadius} 0px 0px;
    height: 100px;
    width: 16px;
    transform: rotateY(180deg);
  }
`;

export default controlStyles;
