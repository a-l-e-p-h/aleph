import { css } from "lit-element";

import theme from "../../globalStyles/theme";

const windowStyles = css`
  .window-container {
    display: inline-block;
    background-color: ${theme.colors.midGrey};
    border-radius: ${theme.measurements.borderRadius};
    padding: 10px;
  }

  .title-container {
    display: flex;
    justify-content: space-between;
  }

  .title {
    text-transform: uppercase;
    padding: 4px 8px;
    background-color: ${theme.colors.black};
    border-radius: ${theme.measurements.borderRadius};
    color: ${theme.colors.white};
    font-family: Roboto Mono;
    font-weight: 400;
    margin: 0;
  }

  .controls {
    display: flex;
    align-items: center;
  }

  aleph-window-button:not(:last-of-type) {
    margin-right: 10px;
  }

  .inner-container {
    background-color: ${theme.colors.darkGrey};
    border-radius: ${theme.measurements.borderRadius};
    padding: 10px;
    margin-top: 10px;
  }
`;

export default windowStyles;
