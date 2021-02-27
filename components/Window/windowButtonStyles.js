import { css } from "lit-element";

import theme from "../../globalStyles/theme";

const windowButtonStyles = css`
  .button {
    background-color: ${theme.colors.darkGrey};
    border-radius: ${theme.measurements.borderRadius};
    padding: 3px;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
  }

  .button:hover {
    background-color: ${theme.colors.black};
    border: 1px solid ${theme.colors.white};
    cursor: pointer;
  }

  .minimize {
    background-color: transparent;
    border-bottom: 2px solid ${theme.colors.white};
    width: 12px;
    height: 12px;
  }

  .maximize {
    background-color: transparent;
    border: 2px solid ${theme.colors.white};
    width: 10px;
    height: 9px;
  }

  .close {
    width: 2px;
    height: 18px;
    background-color: ${theme.colors.white};
    position: relative;
    transform: rotate(45deg);
    margin-left: -1px;
  }

  .close:after {
    background-color: ${theme.colors.white};
    content: "";
    height: 2px;
    width: 18px;
    position: absolute;
    left: -8px;
    top: 7px;
  }
`;

export default windowButtonStyles;
