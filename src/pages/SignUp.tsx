import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import Checkbox from '@/components/ui/Checkbox';
import theme from '@/styles/theme';
import { signUp } from '@/api/accountAPI';
import { useState } from 'react';

const SignUpPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !passwordCheck) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isAgreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    try {
      const response = await signUp({
        email,
        password,
        password_check: passwordCheck,
      });

      console.log('회원가입 응답:', response);
      alert('회원가입이 완료되었습니다.');

      // 회원가입 후 로그인 페이지로 이동
      navigate('/signin');
    } catch (error) {
      console.error('회원가입 에러:', error);

      // 더 상세한 에러 처리
      if (error instanceof Error) {
        // axios 에러인 경우 response 정보 확인
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const axiosError = error as any;
        const errorMessage =
          axiosError.response?.data?.message || error.message || '회원가입 중 오류가 발생했습니다.';
        alert(errorMessage);
      }
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Welcome>
          <Title>혼저 옵서예</Title>
          <Subtitle>PIC에서 만나 반가워요!</Subtitle>
        </Welcome>
        <Separator size="lg" />
        <InputWrapper>
          <Input
            placeholder="이메일주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <Separator size="sm" />
        <InputWrapper>
          <Input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <Separator size="sm" />
        <InputWrapper>
          <Input
            placeholder="비밀번호확인"
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </InputWrapper>
        <Separator size="sm" />
        <CheckboxWrapper>
          <Checkbox
            label="(필수) 개인정보 수집 및 이용 동의"
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
          />
        </CheckboxWrapper>
        <Separator size="lg" />
        <Button size="md" onClick={handleSignUp}>
          가입하기
        </Button>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 26px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Welcome = styled.div`
  width: 100%;
  color: ${theme.colors.darkGray};
  text-align: left;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 4px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: normal;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
`;

export default SignUpPage;
