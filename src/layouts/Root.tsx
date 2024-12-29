import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Nav';
import Header from '@/components/layout/Header';
import theme from '@/styles/theme';

const RootLayout = () => (
  <Wrapper>
    <Header />
    <Content>
      <Outlet />
    </Content>
    <Navbar />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${theme.colors.darkGray};
`;

const Content = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
`;

export default RootLayout;
