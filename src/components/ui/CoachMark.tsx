import React from 'react';
import styled from '@emotion/styled';

interface CoachMarkProps {
  pageName: 'main' | 'mypic';
  onClose: () => void;
}

const CoachMark: React.FC<CoachMarkProps> = ({ pageName, onClose }) => {
  const coachMarkContent = {
    main: {
      title: '제주도 여행 장소 추천',
      steps: [
        '카드를 오른쪽으로 스와이프하면 마이픽에 저장됩니다.',
        '관심 있는 장소의 자세한 정보를 확인할 수 있어요.',
        '다양한 제주도 명소를 만나보세요!',
      ],
    },
    mypic: {
      title: '나의 찜한 장소',
      steps: [
        '좋아요 누른 장소들을 모아볼 수 있어요.',
        '카드를 왼쪽으로 스와이프하면 마이픽에서 삭제됩니다.',
        '장소를 클릭하면 상세 정보를 볼 수 있어요.',
      ],
    },
  };

  const content = coachMarkContent[pageName];

  return (
    <CoachMarkOverlay>
      <CoachMarkContainer>
        <Title>{content.title}</Title>
        <StepList>
          {content.steps.map((step, index) => (
            <StepItem key={index}>
              <StepNumber>{index + 1}</StepNumber>
              {step}
            </StepItem>
          ))}
        </StepList>
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

const StepList = styled.ul`
  text-align: left;
  margin-bottom: 16px;
`;

const StepItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const StepNumber = styled.span`
  background: #007bff;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
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
