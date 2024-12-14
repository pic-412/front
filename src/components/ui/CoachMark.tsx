import React from 'react';
import styled from '@emotion/styled';

interface CoachMarkProps {
  pageName: 'main' | 'mypic';
  onClose: () => void;
}

// SVG 컴포넌트들을 인라인으로 정의
const LeftArrowSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 19L8 12L15 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RightArrowSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 5L16 12L9 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CenterSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const CoachMark: React.FC<CoachMarkProps> = ({ pageName, onClose }) => {
  const coachMarkContent = {
    main: {
      title: '제주도 여행 장소 추천',
      details: [
        <>
          마음에 드는 사진이라면 오른쪽으로 스와이프! <RightArrowSvg />
        </>,
        <>
          사진이 마음에 들지 않는다면 왼쪽으로 스와이프! <LeftArrowSvg />
        </>,
      ],
    },
    mypic: {
      title: '나의 찜한 장소',
      details: [
        <>
          PIC을 취소하고 싶다면 왼쪽으로 스와이프! <LeftArrowSvg />
        </>,
        <>
          장소 정보를 알고 싶다면 사진 클릭! <CenterSvg />
        </>,
        <>
          사진이 마음에 들지 않는다면 왼쪽으로 스와이프! <RightArrowSvg />
        </>,
      ],
    },
  };

  const content = coachMarkContent[pageName];

  return (
    <CoachMarkOverlay>
      <CoachMarkContainer>
        <Title>{content.title}</Title>
        <Content>
          {content.details.map((detail, index) => (
            <ListItem key={index}>{detail}</ListItem>
          ))}
        </Content>
        <CloseButton onClick={onClose}>시작하기</CloseButton>
      </CoachMarkContainer>
    </CoachMarkOverlay>
  );
};

const CoachMarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const CoachMarkContainer = styled.div`
  background: white;
  width: 90%;
  max-width: 400px;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Content = styled.ul`
  text-align: left;
  margin-bottom: 16px;
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default CoachMark;
