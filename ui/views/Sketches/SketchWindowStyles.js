import { css } from "lit-element";

import theme from "../../globalStyles/theme";

const sketchWindowStyles = css`
  .layer-container {
    padding: 7px;
    background: ${theme.colors.midGrey};
    width: calc(100% - 2px);
    box-sizing: border-box;
    margin-bottom: 7px;
  }

  h3 {
    color: ${theme.colors.lightGrey};
    font-size: 1rem;
    margin: 0;
  }
`;

export default sketchWindowStyles;
