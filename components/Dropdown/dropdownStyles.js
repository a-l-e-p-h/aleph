import { css } from "lit-element";

import theme from "../../globalStyles/theme";
import { hex2rgba } from "../../utils";

const dropdownStyles = css`
  .dropdown-container {
    display: inline-block;
    width: 324px;
    background: ${theme.colors.black};
    border-radius: ${theme.measurements.borderRadius};
  }

  .dropdown-container p {
    margin: 0;
    padding: 7px;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Roboto Mono;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
  }

  .header p {
    max-width: 85%;
    font-size: 12px;
  }

  .header:hover {
    cursor: pointer;
    background: ${hex2rgba(theme.colors.darkGrey, 0.2)};
  }

  .header:hover .arrow {
    border-left: 13px solid ${theme.colors.white};
  }

  .arrow {
    width: 0;
    height: 0;
    margin: auto 0;
    transform: translate(1px, -1px);
    background: transparent;
    border-top: 8px solid transparent;
    border-left: 13px solid ${theme.colors.midGrey};
    border-bottom: 8px solid transparent;
    transform: rotate(90deg);
    transition: 300ms ease-out transform, 300ms ease border-left;
  }

  .arrow-open {
    transform: rotate(90deg) rotateY(180deg);
    border-left: 13px solid ${theme.colors.green} !important;
  }

  .selection {
    color: ${theme.colors.blue};
  }

  .options-container {
    display: none;
  }

  .open {
    display: inline-block;
    max-height: 150px;
    overflow-y: scroll;
  }

  ${theme.components.scrollBar}

  .option {
    font-size: 12px;
    width: 300px;
    color: ${theme.colors.white};
    background: ${hex2rgba(theme.colors.darkGrey, 0.5)};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    transition: 300ms ease background, 300ms ease color;
  }

  .option:hover {
    cursor: pointer;
    color: ${theme.colors.green};
    background: ${hex2rgba(theme.colors.darkGrey, 0.2)};
  }

  .option:active {
    background: ${theme.colors.green};
    color: ${theme.colors.black};
  }
`;

export default dropdownStyles;