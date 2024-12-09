const colors = {
  primary: '#8FD797',
  hoverPrimary: '#FDF6AC',
  supportGray: '#F7F5F5',
  black: '#1B232A',
  white: '#FFFFFF',
  darkGray: '#8E8e93',
  lightGray: '#E4E4E4',
  bg: '#FFFEF7', // 배경색
};

const fontSizes = {
  xsmall: '10px',
  small: '12px',
  normal: '14px',
  large: '16px',
  xlarge: '18px',
  xxlarge: '20px',
};

// input, button, toast 등의 높이를 정의
const heights = {
  short: '32px',
  medium: '40px',
  tall: '50px',
  xtall: '60px',
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSizes;
export type HeightsTypes = typeof heights;

interface Theme {
  colors: ColorsTypes;

  fontSizes: FontSizeTypes;
  heights: HeightsTypes;
}
// ThemeProvider 적용하기 위해 Theme 타입을 정의
const theme: Theme = {
  colors,

  fontSizes,
  heights,
};

export default theme;
