import styled from '@emotion/styled';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Separator from '@/components/ui/Separator';
import Checkbox from '@/components/ui/Checkbox';
import LocationCard from '@/components/ui/LocationCard';

const ProfilePage = () => {
  return (
    <Container>
      <ButtonWrapper>
        <Button size="sm">저장</Button>
        <Button size="sm" variant="white">
          더보기
        </Button>
      </ButtonWrapper>
      <Separator size="sm" />
      <Button size="md">로그아웃</Button>
      <Separator size="sm" />
      <Button size="lg">회원가입</Button>
      <Separator size="md" />
      <StyledInput placeholder="이메일 주소" />
      <Separator size="sm" />
      <StyledInput placeholder="비밀번호" />
      <Separator size="sm" />
      <StyledInput placeholder="비밀번호 확인" />
      <Separator size="sm" />
      <CheckboxContainer>
        <Checkbox
          label="(필수) 개인정보 수집 및 이용 동의"
          checked={false}
          onChange={(checked) => console.log(checked)}
        />
      </CheckboxContainer>
      <Separator size="sm" />
      <LocationCard
        name="스타벅스 강남점"
        address="서울시 강남구 테헤란로 1234"
        operatingHours="매일 07:00 - 22:00"
      />
      <Separator size="sm" />
      <LocationCard name="한신포차" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 100%;
  max-width: 450px;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  max-width: 450px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px; // Adds space between buttons
  width: 100%;
`;
export default ProfilePage;
