import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import theme from '@/styles/theme';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <Content>
        <Title>404</Title>
        <Message>페이지를 찾을 수 없습니다.</Message>
        <HomeButton onClick={() => navigate('/')} variant="default">
          홈으로 돌아가기
        </HomeButton>
      </Content>
    </NotFoundWrapper>
  );
};

const NotFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${theme.colors.bg};
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 72px;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 20px;
  margin-bottom: 32px;
`;

const HomeButton = styled(Button)`
  width: 200px;
  height: 48px;
`;

export default NotFoundPage;
