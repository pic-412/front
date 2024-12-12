import React from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import Button from '@/components/ui/Button';
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ConfirmModalContainer onClick={(e) => e.stopPropagation()}>
        <ConfirmMessage>{message}</ConfirmMessage>
        <ButtonGroup>
          <CancelButton size="sm" variant="white" onClick={onClose}>
            아니요
          </CancelButton>
          <YesButton size="sm" onClick={onConfirm}>
            네
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
`;

// 확인 모달 스타일
const ConfirmModalContainer = styled.div`
  width: 80%;
  max-width: 400px;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  padding: 80px 48px;
  text-align: center;
`;

const ConfirmMessage = styled.p`
  color: ${theme.colors.black};
  font-size: 20px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const YesButton = styled(Button)`
  width 59px;
  height: 35px;
  box-shadow: 0px 4px 4px ${theme.colors.darkGray};
`;

const CancelButton = styled(Button)`
  width 59px;
  height: 35px;
  box-shadow: 0px 4px 4px ${theme.colors.darkGray};
  background-color: ${theme.colors.gray};
`;
