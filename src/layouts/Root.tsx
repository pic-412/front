import { useEffect } from 'react';

import styled from '@emotion/styled';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Nav';
import { useAuthStore } from '@/store/authStore';
import theme from '@/styles/theme';
const RootLayout = () => {
  const { token, refreshAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authRequiredPages = ['/profile', '/mypic'];
    const isAuthRequired = authRequiredPages.some((page) => location.pathname.startsWith(page));

    if (token) {
      refreshAccessToken().catch(() => {
        useAuthStore.getState().logout();
        if (isAuthRequired) {
          navigate('/signin');
        }
      });
    } else if (isAuthRequired) {
      navigate('/signin');
    }
  }, [token, refreshAccessToken, navigate, location]);

  return (
    <Wrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Navbar />
    </Wrapper>
  );
};

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
