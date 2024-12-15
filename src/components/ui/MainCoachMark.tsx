import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import LeftArrowSvg from '@/assets/images/icons/arrow_left.svg';
import RightArrowSvg from '@/assets/images/icons/arrow_right.svg';

interface CoachMarkProps {
  onClose: () => void;
}

const MainCoachMark: React.FC<CoachMarkProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <CoachMarkOverlay>
      <CoachMarkContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ImageContainer>
          <Content>
            <Right>
              <h1>
                마음에 드는 사진이라면
                <br />
                오른쪽으로 스와이프!
              </h1>
              <img src={RightArrowSvg} alt="오른쪽 화살표" />
            </Right>
            <Left>
              <img src={LeftArrowSvg} alt="왼쪽 화살표" />
              <h1>
                사진이 마음에 들지 않는다면 <br />
                왼쪽으로 스와이프!
              </h1>
            </Left>
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
  font-size: 20px;
  line-height: 2;

  h1 {
    margin: 0 15px;
  }
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin-bottom: 150px;
`;

const Left = styled.div`
  display: flex;
  text-align: left;
  justify-content: flex-start;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -100px;
  right: 15px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  color: white;
`;

export default MainCoachMark;
