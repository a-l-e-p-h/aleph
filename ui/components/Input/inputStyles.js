import { css } from "lit-element";

import theme from "../../globalStyles/theme";

const inputStyles = css`
  .text-input {
    background: ${theme.colors.darkGrey};
    border: 1px solid ${theme.colors.midGrey};
    border-radius: ${theme.measurements.borderRadius};
    font-family: Roboto Mono;
    font-size: 12px;
    color: ${theme.colors.white};
    padding: 3px 5px;
  }

  .text-input:focus {
    border: 1px solid ${theme.colors.blue};
    outline: none;
  }

  .text-input:active {
    border: 1px solid ${theme.colors.white};
  }

  .text-input::placeholder {
    color: ${theme.colors.lightGrey};
  }

  .text-input:disabled {
    opacity: 0.5;
  }

  ::selection {
    background: ${theme.colors.black};
    color: ${theme.colors.green};
  }
`;

export default inputStyles;
