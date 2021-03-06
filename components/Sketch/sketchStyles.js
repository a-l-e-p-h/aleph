import { css } from "lit-element";

import theme from "../../globalStyles/theme";
import { baseButtonStyles } from "../Button/buttonStyles";
import { hex2rgba } from "../../utils";

const playStyles = css`
  width: 0;
  height: 0;
  margin: 0 auto;
  transform: translate(1px, -1px);
  background: transparent;
  border-top: 7px solid transparent;
  border-left: 13px solid ${theme.colors.green};
  border-bottom: 7px solid transparent;
  box-shadow: none;
`;

const sketchStyles = css`
  .sketch-button {
    ${baseButtonStyles}
    padding: 7px;
    width: 220px;
  }

  .sketch-button p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%;
  }

  .sketch-button:hover {
    cursor: pointer;
    background: ${hex2rgba(theme.colors.black, 0.8)};
  }

  .sketch-button:focus {
    outline: none;
  }

  .transport-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
    height: 23px;
    margin-right: 10px;
    background: ${theme.colors.darkGrey};
    box-shadow: 1px 1px 0px ${theme.colors.midGrey};
    transition: 300ms ease-out box-shadow;
  }

  .transport-indicator {
  }

  .sketch-button:hover .transport-container {
    box-shadow: 1.5px 1.5px 0px ${theme.colors.blue};
  }

  .playing {
    ${playStyles}
  }

  .paused {
    position: relative;
    margin-left: -25%;
    width: 3px;
    height: 12px;
    background: ${theme.colors.lightGrey};
    box-shadow: 1px 1px 0px ${theme.colors.midGrey};
  }

  .paused:after {
    content: "";
    width: inherit;
    height: inherit;
    background: inherit;
    box-shadow: inherit;
    position: absolute;
    top: 0;
    left: 7px;
  }

  .sketch-button:hover .paused {
    ${playStyles}
    border-left: 13px solid ${theme.colors.black};
  }

  .sketch-button:hover .paused:after {
    display: none;
  }
`;

export default sketchStyles;
