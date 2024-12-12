import React, { useState } from 'react';
import styled from '@emotion/styled';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import logo from '@/assets/images/logo.svg';
import { signIn } from '@/api/accountAPI';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      alert('로그인에 성공했습니다.');
      console.log(response);
      // TODO: Add navigation or state management after successful login
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Logo src={logo} alt="logo" />
        <Separator size="lg" />
        <Input placeholder="이메일주소" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Separator size="sm" />
        <Input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Separator size="lg" />
        <Button size="md" onClick={handleSignIn}>
          로그인
        </Button>
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

export default SignInPage;
