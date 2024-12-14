/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import Checkbox from '@/components/ui/Checkbox';
import theme from '@/styles/theme';
import { signUp } from '@/api/accountAPI';
import PasswordInput from '@/components/ui/ShowPassword';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import TouModal from '@/components/ui/TouModal';
const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTouModalOpen, setIsTouModalOpen] = useState(false);

  // 에러 상태 추가
  const [isError, setIsError] = useState(false);
  const [, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    // 초기 에러 상태 초기화
    setIsError(false);
    setErrorMessage('');

    // 기존 유효성 검사 로직
    if (!email || !password || !passwordCheck) {
      setIsError(true);
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      setIsError(true);
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isAgreed) {
      setIsError(true);
      setErrorMessage('개인정보 수집 및 이용에 동의해주세요.');
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
      navigate('/signin');
    } catch (error) {
      setIsError(true);
      // 에러 메시지 처리
      if (error instanceof Error) {
        const axiosError = error as any;
        const message =
          axiosError.response?.data?.message || error.message || '회원가입 중 오류가 발생했습니다.';
        setErrorMessage(message);
      }
    }
  };

  const handleTouModalOpen = () => {
    setIsTouModalOpen(true);
  };

  const handleTouModalClose = () => {
    setIsTouModalOpen(false);
  };

  const handleTouAgree = () => {
    setIsAgreed(true);
    setIsTouModalOpen(false);
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
            style={{
              borderColor: isError ? 'red' : '#ccc',
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
          />
          {isError && email === '' && (
            <ErrorMessage
              message="이메일 형식이 맞지 않아요. 한번 더 확인해주세요."
              isVisible={true}
            />
          )}
        </InputWrapper>
        <Separator size="sm" />
        <InputWrapper>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isError={isError}
          />
          {isError && password === '' && (
            <ErrorMessage
              message="8~23자 영문 대소문자, 숫자, 특수문자를 사용하세요."
              isVisible={true}
            />
          )}
        </InputWrapper>
        <Separator size="sm" />
        <InputWrapper>
          <PasswordInput
            placeholder="비밀번호확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            isError={isError}
          />
          {isError && passwordCheck === '' && (
            <ErrorMessage message="비밀번호를 다시 한번 입력해주세요." isVisible={true} />
          )}
          {isError && password !== passwordCheck && (
            <ErrorMessage message="비밀번호가 일치하지 않아요." isVisible={true} />
          )}
        </InputWrapper>
        <Separator size="sm" />
        <CheckboxWrapper>
          <Checkbox
            label="(필수) 개인정보 수집 및 이용 동의"
            checked={isAgreed}
            onChange={handleTouModalOpen}
          />
          {isError && !isAgreed && (
            <ErrorMessage message="개인정보 수집 및 이용에 동의해주세요." isVisible={true} />
          )}
        </CheckboxWrapper>
        <Separator size="lg" />
        <Button size="md" onClick={handleSignUp}>
          가입하기
        </Button>
      </ContentWrapper>

      {/* TOU 모달 */}
      <TouModal
        isOpen={isTouModalOpen}
        onConfirm={handleTouAgree}
        onClose={handleTouModalClose}
        message={`
  **PIC**(이하 “회사”)의 본 개인정보처리방침은 이용자가 회사가 관리 · 운영하는 서비스 웹과 모바일 웹에서 제공하는 서비스(이하 ‘서비스라 합니다)를 이용함에 적용되며, 다음과 같은 내용을 담고 있습니다.

  ### 제1조 개인정보의 처리(수집·이용) 목적

  회사는 이용자의 소중한 개인정보를 보호하기 위해 최선을 다하고 있습니다. 회사는 개인 정보 보호법 등 정보통신서비스제공자가 준수하여야 할 관계 법령 및 개인 정보 보호 규정, 가이드라인을 준수하고 있습니다.

  회사의 개인정보 보호법 제30조에 따라 본 개인정보처리방침을 정하며, 본 방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 이용자의 개인 정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려 드립니다.

  본 방침은 개인정보 보호 법령 및 관련 지침의 개정이나 회사 내부 방침의 변경 등으로 인하여 수시로 개정될 수 있고, 본 방침을 통해 그 개정 내역이 고지되고 있어 이용자는 수시로 확인 할 수 있습니다.

  ### 제2조 개인정보의 수집 및 이용 목적

  회사는 이용자의 플랫폼 이용에 따른 서비스를 수행하기 위해 최소한의 필수 정보를 수집하고 있습니다.
  1. 회원가입
    - 수집 항목
      - [필수] 이메일, 닉네임
    - 이용 목적 : 이용자 식별, 회원 정보 관리 목적, 민원 처리 및 피해 보상, 상담 처리 등 서비스 전반 제공
    - 보유 및 이용 기간 : 회원 탈퇴 시 즉시 파기
  2. 서비스 이용
    - 수집 항목
      - 서비스 이용 기록(최근 접속일, 가입일, 접속 IP 정보, 이벤트 로그), 기기 정보(고유 기기 식별값, OS버전)
    - 이용 목적 : 이용자의 서비스 이용 및 서비스 개선을 위한 통계 분석
    - 보유 및 이용 기간 : 회원 탈퇴 시 즉시 파기

  ### 제3조 개인정보 보유 및 이용 기간

  회원 관리, 서비스 제공·개선, 신규 서비스 개발 등을 위해 이용합니다.

  - 회원 식별, 가입 의사 확인, 콘텐츠 제공, 특정 맞춤 서비스 제공, 본인 확인 등과 같은 서비스 제공
  - 통계학적 특성에 따른 서비스 제공
  - 분쟁 조정을 위한 기록 보존, 불만 처리 등 민원 처리, 고지 사항 전달, 회원 탈퇴 의사의 확인 등과 같은 회원 관리를 위한 목적, 이용 약관 위반 회원에 대한 이용 제한 조치
  - 신규 서비스 및 콘텐츠 개발 및 고객 분석
  - 서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계/맞춤형 서비스 제공, 서비스 개선 활용

  ### 제4조 개인정보 파기 절차 및 방법

  이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용 기간이 경과 되면 지체 없이 파기 됩니다.

  전자적 파일 형태인 경우 복구 및 재생되지 않도록 안전하게 삭제하고, 그 밖에 기록물, 인쇄물, 서면 등의 경우 분쇄하거나 소각하여 파기합니다.

  ### 제5조 개인정보의 제3자 제공

  회사는 이용자들에게 고지한 개인정보의 수집·이용 목적 범위 내에서 사용하며, 동의 받은 범위를 넘어서 제3자에게 제공하지 않습니다. 다만 아래의 경우는 예외로 합니다.

  1. 이용자들이 사전에 공개에 동의한 경우: 정보 수집 또는 정보 제공 이전에 이용자에게 비즈니스 파트너가 누구인지, 그리고 언제까지 어떻게 보호/관리되는지 알려드리고 동의를 구하는 절차를 거치게 되며, 이용자가 동의하지 않는 경우에는 추가적인 정보를 수집하거나 비즈니스 파트너와 공유하지 않습니다.

  2. 법령의 규정에 따르거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사 기관의 요구가 있는 경우

  3. 통계 작성, 학술 연구나 시장 조사를 위하여 필요한 경우로서 국무조정실, 행정자치부, 방송통신위원회, 금융위원회, 미래 창조 과학부, 보건복지부에서 2016. 6. 30. 합동으로 발표한 ⌜개인정보 비식별 조치 가이드라인⌟에 따라 비식별 조치 및 적정성 평가를 마친 후 비식별 정보로 판단된 경우

  ### 제6조 이용자의 권리

  - 이용자는 언제든지  PIC 프로필에서 자신의 개인정보를 수정 · 삭제할 수 있습니다.
  - 이용자는 자신의 개인정보에 대한 열람을 요청할 수 있습니다.
  - 이용자는 언제든지 개인정보 처리의 정지를 요청할 수 있으며, 법률에 특별한 규정이 있는 등의 경우에는 처리 정지 요청을 거부할 수 있습니다.
  - 이용자는 언제든지 회원 탈퇴 등을 통해 개인정보의 수집 및 이용 동의를 철회할 수 있습니다.
  - 이용자가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리 결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.
  - 이용자 및 법정대리인의 권리는 회원 정보 페이지 등에서 직접 처리하거나, 문의하기를 통해 요청할 수 있습니다. 이용자 개인의 서비스 이용 활동 및 동의 내역에 따라 제3자에게 제공한 내역은 개인정보 이용 현황 페이지에서 확인하고 동의 철회를 요청할 수 있습니다.

  ### 제7조 개인정보의 안전성 확보 조치

  회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적/물리적 보호 대책을 강구하고 있습니다.

  1. 정기적인 자체 감사 실시

  개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.

  2. 개인정보 취급 직원의 최소화 및 교육

  개인정보를 취급하는 직원을 지정하고 담당자에 한정 시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.

  3. 내부관리계획의 수립 및 시행

  개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.

  4. 해킹 등에 대비한 기술적 대책

  회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.

  5. 접속 기록의 보관 및 위변조 방지

  개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실 되지 않도록 보안 기능 사용하고 있습니다.

  6. 개인정보에 대한 접근 제한

  개인정보를 처리하는 데이터베이스시스템에 대한 접근 권한의 부여,변경,말소를 통하여 개인정보에 대한 접근 통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.

  7. 문서 보안을 위한 잠금 장치 사용

  개인정보가 포함된 서류, 보조저장매체 등을 잠금 장치가 있는 안전한 장소에 보관하고 있습니다.

  8. 비인가자에 대한 출입 통제

  개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입 통제 절차를 수립, 운영하고 있습니다.

  ### 제8조 개인정보 관리책임자

  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보 주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

  개인정보 보호책임자

  이름 :  천현경

  소속 : 개인정보보호 책임자

  전화번호:  0507-1413-0000

  정보 주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.<PIC>은(는) 정보 주체의 개인정보 열람 청구가 신속하게 처리되도록 노력하겠습니다.

  ---

  ### 제9조 권익 침해 구제 방법

  정보 주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁 해결이나 상담 등을 신청할 수 있습니다. 

  이 밖에 기타 개인정보침해의 신고, 상담에대하여는 아래의 기관에 문의하시기 바랍니다.

  1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
  2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
  3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
  4. 경찰청 : (국번없이) 182 (cyberbureau.police.go.kr)

  「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공 기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정 심판을 청구할 수 있습니다.
  ※ 행정 심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.

  ### 제10조 개인정보 고지 의무

  본 개인정보처리방침은 정부의 정책 또는 회사의 필요에 의하여 변경될 수 있으며 내용의 추가 및 삭제, 수정이 있을 시에는 홈페이지를 통해 지체 없이 공지하여, 이 정책은 공지한 날로부터 시행됩니다.

  1. 개인정보 처리방침 버전번호 : v1.0.0
  2. 현재 개인정보 처리방침 고지일자 : 2024년 12월 15일
  3. 현재 개인정보 처리방침 시행일자 : 2024년 12월 15일`}
      />
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
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
