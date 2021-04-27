import { css } from "lit";

import theme from "../../globalStyles/theme";

const sketchWindowStyles = css`
  h3 {
    user-select: none;
  }

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
    --dropdown-width: 140px;
    --dropdown-option-width: 117px;
  }
`;

export default sketchWindowStyles;
