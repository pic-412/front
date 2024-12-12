import { css, Global } from '@emotion/react';

import fontStyles from '@/styles/GlobalFonts';
import theme from '@/styles/theme';

const baseStyles = css`
  ${fontStyles} /* @font-face */
  /* reset */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  address,
  code,
  img,
  small,
  strike,
  strong,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  details,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  input,
  textarea,
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    outline: 0;
    border: 0;
    cursor: pointer;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
  /* base */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    line-height: 1;
    font-size: ${theme.fontSizes.large}; /* 16px */
    color: ${theme.colors.black};
    letter-spacing: -0.14px;
    background-color: ${theme.colors.darkGray};
  }

  input,
  textarea {
    font-family: 'Pretendard', sans-serif;
    letter-spacing: -0.14px;
    color: ${theme.colors.black};

    &::placeholder {
      color: ${theme.colors.darkGray};
      opacity: 1; /* Firefox */
    }
  }

  .app-wrapper {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    background-color: ${theme.colors.white};
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
  }

  header {
    background-color: ${theme.colors.white};
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;
    height: calc(100vh - 140px); // Subtract header and nav height
    overflow-y: auto;
  }

  nav {
    background-color: ${theme.colors.white};
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px 0;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    bottom: 0;
    z-index: 10;
    border-top: 1px solid ${theme.colors.lightGray};
  }

  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.bg};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeOut 1s ease-in-out forwards;
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        visibility: hidden;
      }
    }

    img {
      width: 120px;
      height: auto;
      margin-bottom: 16px;
    }

    p {
      font-size: ${theme.fontSizes.large};
      color: ${theme.colors.primary};
    }
  }
`;

const GlobalStyle = () => <Global styles={baseStyles} />;

export default GlobalStyle;
