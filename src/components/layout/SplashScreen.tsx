import styled from '@emotion/styled';
import logo from '@/assets/images/logo.svg';
import theme from '@/styles/theme';

const SplashScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeOut 5s 1s forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 16px;
  color: ${theme.colors.primary};
`;

const SplashScreen = () => {
  // const hasVisitedBefore =
  //   typeof window !== 'undefined' ? sessionStorage.getItem('hasVisited') : null;

  // if (typeof window !== 'undefined' && !hasVisitedBefore) {
  //   sessionStorage.setItem('hasVisited', 'true');
  // }
  // if (hasVisitedBefore) return null;

  return (
    <SplashScreenWrapper>
      <Logo src={logo} alt="PIG!" />
      <Text>사진으로부터 시작되는 제주도 여행</Text>
    </SplashScreenWrapper>
  );
};

export default SplashScreen;
