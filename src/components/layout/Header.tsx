import styled from '@emotion/styled';
import logo from '@/assets/images/logo.svg';
import goback from '@/assets/images/icons/goback.svg';
import { PATH, PATH_TITLE } from '@/constants/path';
import { useNavigate } from 'react-router-dom';
import theme from '@/styles/theme';

const Header = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleMain = () => {
    navigate(PATH.MAIN);
  };

  let headerContent;
  const currentPathKey = Object.keys(PATH).find(
    (key) => PATH[key as keyof typeof PATH] === currentPath

  );

  if (
    currentPath === PATH.SIGNIN ||
    currentPath === PATH.SIGNUP ||
    currentPath === PATH.PROFILE ||
    currentPath === PATH.PROFILE_EDIT
  ) {
    if (currentPathKey && PATH_TITLE[currentPathKey as keyof typeof PATH_TITLE]) {
      headerContent = (
        <StyledHeaderContainer>
          <StyledBackButton onClick={handleGoBack}>
            <img src={goback} width={35} alt="뒤로가기" />
          </StyledBackButton>
          <StyledTitle>{PATH_TITLE[currentPathKey as keyof typeof PATH_TITLE]}</StyledTitle>
        </StyledHeaderContainer>
      );
    }
  } else {
    headerContent = (
      <StyledHeaderContainer>
        <img src={logo} width={60} alt="로고" onClick={handleMain} />
      </StyledHeaderContainer>
    );
  }

  return <StyledHeader>{headerContent}</StyledHeader>;
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledBackButton = styled.div`
  cursor: pointer;
  position: absolute;
  left: 16px;
`;

const StyledTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin: 0;
  text-align: center;
  flex: 1;
`;

export default Header;
