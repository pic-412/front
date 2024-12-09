import styled from '@emotion/styled';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import Checkbox from '@/components/ui/Checkbox';
import theme from '@/styles/theme';

const SignUpPage = () => {
  return (
    <Container>
      <ContentWrapper>
        <Welcome>
          <Title>혼저 옵서예</Title>
          <Subtitle>PIC에서 만나 반가워요!</Subtitle>
        </Welcome>
        <Separator size="lg" />
        <Input placeholder="이메일주소" />
        <Separator size="sm" />
        <Input placeholder="비밀번호" />
        <Separator size="sm" />
        <Input placeholder="비밀번호확인" />
        <Separator size="sm" />
        <CheckboxWrapper>
          <Checkbox label="(필수) 개인정보 수집 및 이용 동의" />
        </CheckboxWrapper>
        <Separator size="lg" />
        <Button size="md">회원가입</Button>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
`;

const Welcome = styled.div`
  width: 100%;
  color: ${theme.colors.darkGray};
  text-align: left;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 24px;
  margin-bottom: 4px;
`;

const Subtitle = styled.h2`
  text-align: left;
  font-size: 16px;
  font-weight: normal;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
`;

export default SignUpPage;
