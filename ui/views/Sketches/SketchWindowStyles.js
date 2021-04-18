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

  aleph-dropdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 1rem;
  }
`;

export default sketchWindowStyles;
