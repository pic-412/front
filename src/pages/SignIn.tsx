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


const SignInPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
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
      } else {
        console.error('토큰을 찾을 수 없습니다.');
        alert('로그인 중 문제가 발생했습니다.');
        return;
      }

      alert('로그인에 성공했습니다.');
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
        <Separator size="lg" />
        <Input placeholder="이메일주소" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Separator size="sm" />
        <PasswordInput 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Separator size="lg" />
        <Button size="md" onClick={handleSignIn}>
          로그인
        </Button><Separator size="sm" />
  
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
  margin-top: 20px;
`;
export default SignInPage;
