import { css } from "lit";

const green = css`#12e4a6`;
const blue = css`#00b4f6`;
const red = css`#b71515`;
const orange = css`#cd5906`;
const white = css`#d4e1e6`;
const lightGrey = css`#b2b2b2`;
const midGrey = css`#3c4243`;
const darkGrey = css`#292d2e`;
const black = css`#060b0d`;

const borderRadius = css`4px`;

const scrollBar = css`
  ::-webkit-scrollbar {
    width: 10px;
    background-color: ${black};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${darkGrey};
    outline: none;
  }
`;

const vertical = css`linear-gradient(
    180deg,
    #12e4a6 0%,
    #02bbff 53.65%,
    #060b0d 100%
  )`;

const horizontal = css`linear-gradient(
    -90deg,
    #12e4a6 0%,
    #02bbff 53.65%,
    #060b0d 100%
  )`;

const theme = {
  colors: {
    green,
    blue,
    red,
    orange,
    white,
    lightGrey,
    midGrey,
    darkGrey,
    black,
  },
  gradients: {
    vertical,
    horizontal,
  },
  measurements: {
    borderRadius,
  },
  components: {
    scrollBar,
  },
};

export default theme;
