import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

import checkboxIcon from '@/assets/images/icons/checkbox.svg?raw';
import checkedIcon from '@/assets/images/icons/checkbox_clicked.svg?raw';
import logo from '@/assets/images/logo.svg';
import Button from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import Input from '@/components/ui/Input';
import Separator from '@/components/ui/Separator';
import PasswordInput from '@/components/ui/ShowPassword';
import { useToast } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/authStore';
import theme from '@/styles/theme';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const location = useLocation();
  const { Toast, showToast, hideToast } = useToast();
  const login = useAuthStore((state) => state.login);

  const handleSignIn = async () => {
    if (!email || !password) {
      setIsError(true);
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setIsError(true);
      setErrorMessage('이메일 또는 비밀번호를 다시 확인해주세요.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLoginRemember = () => {
    setIsRememberMe((prev) => !prev);
    if (!isRememberMe) {
      localStorage.removeItem('refreshToken');
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setIsRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.message) {
      showToast(location.state.message);

      const timer = setTimeout(() => {
        hideToast();
      }, 2000);

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [location, showToast, hideToast]);

  return (
    <Container>
      <ContentWrapper>
        <Toast />
        <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
        <Separator size="lg" />
        <InputEmail
          placeholder="이메일주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          $isError={isError}
        />
        <Separator size="sm" />
        <PasswordInput
          isError={isError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ position: 'relative' }}
        />{' '}
        <Checkit>
          <Logining>
            <Checkbox onClick={handleLoginRemember} checked={isRememberMe} />
            자동 로그인
          </Logining>
          <SignUp onClick={handleSignUp}>
            <span>회원가입</span>
          </SignUp>
        </Checkit>
        <Separator size="lg" />
        <Button size="md" onClick={handleSignIn}>
          로그인
        </Button>{' '}
        <ErrorMessage message={errorMessage} isVisible={isError} />
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
`;
const InputEmail = styled(Input)<{ $isError?: boolean }>`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.$isError ? 'red' : '#ccc')};
  margin-bottom: 10px;
`;
const Logo = styled.img`
  width: 100px;
  margin: 0 auto;
`;

const Checkit = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  align-items: center;
`;

const Logining = styled.div`
  color: ${theme.colors.darkGray};
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = styled.div<{ checked?: boolean }>`
  width: 20px;
  height: 20px;
  background-image: url('data:image/svg+xml,${({ checked }) =>
    encodeURIComponent(checked ? checkedIcon : checkboxIcon)}');
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 8px;
  cursor: pointer;
`;
const SignUp = styled.div`
  color: ${theme.colors.darkGray};
  cursor: pointer;
  text-align: right;
  align-self: flex-end;
`;

export default SignInPage;
