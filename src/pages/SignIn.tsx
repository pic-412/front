import { useState } from 'react';
import styled from '@emotion/styled';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import logo from '@/assets/images/logo.svg';
import { signIn } from '@/api/accountAPI';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '@/components/ui/ShowPassword';
import theme from '@/styles/theme';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      setIsError(true);
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      const response = await signIn({
        email,
        password,
      });
      const token = response.access;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setIsError(true);
        setErrorMessage('로그인 중 문제가 발생했습니다.');
      }
    } catch {
      setIsError(true);
      setErrorMessage('이메일 또는 비밀번호를 다시 확인해주세요.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };
  return (
    <Container>
      <ContentWrapper>
        <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
        <Separator size="lg" />
        <Input
          placeholder="이메일주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            borderColor: isError ? 'red' : '#ccc',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        />
        <Separator size="sm" />
        <PasswordInput
          isError={isError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Separator size="lg" />
        <Button size="md" onClick={handleSignIn}>
          로그인
        </Button>{' '}
        <ErrorMessage message={errorMessage} isVisible={isError} />
        <SignUp onClick={handleSignUp}>
          <span>회원가입</span>
        </SignUp>
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

const Logo = styled.img`
  width: 100px;
  margin: 0 auto;
`;

const SignUp = styled.div`
  color: ${theme.colors.darkGray};
  cursor: pointer;
  margin-top: 120px;
`;

export default SignInPage;
