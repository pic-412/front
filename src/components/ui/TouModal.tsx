import React from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import Button from '@/components/ui/Button';
import Markdown from 'react-markdown'; // Markdown 렌더링을 위한 라이브러리

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const TouModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ConfirmModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>개인정보 수집 및 이용 약관</Title>
        </ModalHeader>
        <ModalContent>
          <ScrollableContent>
            <Markdown>{message}</Markdown>
          </ScrollableContent>
        </ModalContent>
        <ButtonGroup>
          <CancelButton size="sm" variant="white" onClick={onClose}>
            취소
          </CancelButton>
          <YesButton size="sm" onClick={onConfirm}>
            동의하기
          </YesButton>
        </ButtonGroup>
      </ConfirmModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

const ConfirmModalContainer = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid ${theme.colors.lightGray};
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0;
`;

const ModalContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const ScrollableContent = styled.div`
  max-height: 50vh;
  overflow-y: auto;

  /* Markdown 스타일링 */
  h1 {
    font-size: 22px;
    margin-bottom: 15px;
    color: ${theme.colors.darkGray};
  }

  h2,
  h3 {
    font-size: 18px;
    margin-top: 15px;
    margin-bottom: 10px;
    color: ${theme.colors.darkGray};
  }

  p {
    line-height: 1.6;
    margin-bottom: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  border-top: 1px solid ${theme.colors.lightGray};
`;

const YesButton = styled(Button)`
  width: 150px;
`;

const CancelButton = styled(Button)`
  width: 150px;
  background-color: ${theme.colors.gray};
`;

export default TouModal;
