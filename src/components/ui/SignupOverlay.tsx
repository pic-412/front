import React from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface SignupOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SignupOverlay: React.FC<SignupOverlayProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <OverlayContent onClick={(e) => e.stopPropagation()}>
        <Message>
          사진으로 보는
          <br />
          제주도의 장소가 궁금하다면?
        </Message>
        <ButtonGroup>
          <Button size="lg" onClick={handleSignIn}>
            로그인 하기
          </Button>
          <Button size="lg" variant="white" onClick={handleSignUp}>
            회원가입 하기
          </Button>
        </ButtonGroup>
      </OverlayContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const OverlayContent = styled.div`
  padding: 24px;
  border-radius: 8px;
  text-align: center;
`;

const Message = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  padding-top: 150px;
  direction: column;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default SignupOverlay;
