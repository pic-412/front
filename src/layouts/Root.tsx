import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Nav';
import Header from '@/components/layout/Header';
import theme from '@/styles/theme';

const RootLayout = () => (
  <div css={wrapperStyle}>
    <Header />
    <main css={contentStyle}>
      <Outlet />
    </main>
    <Navbar />
  </div>
);

const wrapperStyle = css`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${theme.colors.darkGray};
`;

const contentStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
`;

export default RootLayout;
