import { css } from "lit";

import theme from "../../globalStyles/theme";

const checkboxStyles = css`
  .label {
    font-family: Roboto Mono;
    font-size: 10px;
    color: ${theme.colors.white};
    margin-bottom: 5px;
  }

  .container {
    position: relative;
  }

  .checkbox {
    opacity: 0;
    height: 24px;
    width: 24px;
  }

  .custom-checkbox {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    background-color: ${theme.colors.darkGrey};
    border: 1px solid ${theme.colors.midGrey};
    border-radius: ${theme.measurements.borderRadius};
  }

  .custom-checkbox:hover {
    cursor: pointer;
    background: ${theme.colors.midGrey};
  }

  .checkbox:checked ~ .custom-checkbox {
    background-color: ${theme.colors.blue};
  }

  .checkbox:checked ~ .custom-checkbox:after {
    content: "⚪";
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
  }

  .checkbox:focus ~ .custom-checkbox {
    border: 1px solid ${theme.colors.blue};
  }

  .checkbox:active ~ .custom-checkbox {
    border: 1px solid ${theme.colors.green};
  }
`;

export default checkboxStyles;
