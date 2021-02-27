import { css } from "lit-element";

import theme from "../../globalStyles/theme";

const buttonStyles = css`
  button {
    font-family: Roboto Mono;
    font-size: 12px;
    color: ${theme.colors.lightGrey};
    border: 1px solid ${theme.colors.midGrey};
    background: ${theme.colors.black};
    padding: 5px 7px;
    border-radius: ${theme.measurements.borderRadius};
    transition: 100ms ease-out border, 200ms ease-out box-shadow;
    box-shadow: 0px 0px 0px ${theme.colors.midGrey};
    user-select: none;
  }

  button:hover {
    cursor: pointer;
    border: 1px solid ${theme.colors.lightGrey};
    box-shadow: 2px 2px 0px ${theme.colors.blue};
  }

  button:active {
    border: 1px solid ${theme.colors.green} !important;
    outline: none;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
  }

  button:focus {
    outline: none;
    border: 1px solid ${theme.colors.blue};
  }

  button[disabled] {
    background-color: ${theme.colors.darkGrey};
    opacity: 0.75;
    pointer-events: none;
    cursor: default;
  }
`;

export default buttonStyles;
