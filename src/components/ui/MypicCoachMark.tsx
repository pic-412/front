import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import LeftArrowSvg from '@/assets/images/icons/arrow_left.svg';
import RightArrowSvg from '@/assets/images/icons/arrow_right.svg';
import ClickSvg from '@/assets/images/icons/touch_center.svg';

interface CoachMarkProps {
  onClose: () => void;
}

const MypicCoachMark: React.FC<CoachMarkProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 30000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <CoachMarkOverlay>
      <CoachMarkContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ImageContainer>
          <Content>
            <img src={RightArrowSvg} alt="오른쪽 화살표" />
            <p> 다음 장소를 보고 싶다면 오른쪽으로 스와이프!</p> <br />
            <br />
            <br />
            <br />
            <img src={ClickSvg} alt="가운데" />
            <p>장소 정보를 알고 싶다면 사진 클릭!</p> <br /> <br />
            <br />
            <br />
            <img src={LeftArrowSvg} alt="왼쪽 화살표" />
            <p>PIC을 취소하고 싶다면 왼쪽으로 스와이프!</p>
          </Content>
        </ImageContainer>
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
  width: 100%;
  max-width: 450px;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  position: relative;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Content = styled.div`
  color: white;
  font-size: 16px;
  line-height: 2;

  h1 {
    margin: 0 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  font-size: 20px;
  right: 15px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  color: white;
`;

export default MypicCoachMark;
