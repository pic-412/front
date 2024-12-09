import React from 'react';
import styled from '@emotion/styled';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import logo from '@/assets/images/logo.svg';

const SignInPage = () => {
  return (
    <Container>
      <ContentWrapper>
        <Logo src={logo} alt="logo" />
        <Separator size="lg" />
        <Input placeholder="이메일주소" />
        <Separator size="sm" />
        <Input placeholder="비밀번호" />
        <Separator size="lg" />
        <Button size="md">로그인</Button>
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
