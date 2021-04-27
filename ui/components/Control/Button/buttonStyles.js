import { css } from "lit";

import theme from "../../../globalStyles/theme";

const buttonStyles = css`
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background: ${theme.colors.midGrey};
    border-radius: ${theme.measurements.borderRadius};
  }

  .button-container:hover {
    cursor: pointer;
  }

  .button-value {
    width: 35px;
    height: 35px;
    background: ${theme.colors.blue};
    border-radius: ${theme.measurements.borderRadius};
  }

  .hide-button-value {
    background: transparent;
  }
`;

export default buttonStyles;
