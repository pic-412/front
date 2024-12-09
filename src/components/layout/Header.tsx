import styled from '@emotion/styled';
import logo from '@/assets/images/logo.svg';

const Header = () => {
  return (
    <StyledHeader>
      <img src={logo} width={60} alt="로고" />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default Header;
