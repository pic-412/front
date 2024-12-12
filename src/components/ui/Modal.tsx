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

interface PlaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
  address: string;
  operatingHours: string;
}

// 확인 모달
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
          <Button size="sm" variant="white" onClick={onClose}>
            아니요
          </Button>
          <Button size="sm" onClick={onConfirm}>
            네
          </Button>
        </ButtonGroup>
      </ConfirmModalContainer>
    </ModalOverlay>
  );
};

// 장소 상세 모달
export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  isOpen,
  onClose,
  placeName,
  address,
  operatingHours,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <DetailModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>−</CloseButton>
        <DetailContent>
          <DetailTitle>장소명</DetailTitle>
          <DetailText>{placeName}</DetailText>

          <DetailTitle>주소</DetailTitle>
          <DetailText>{address}</DetailText>

          <DetailTitle>운영시간</DetailTitle>
          <DetailText>{operatingHours}</DetailText>
        </DetailContent>
      </DetailModalContainer>
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
  width: 280px;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  padding: 24px;
  text-align: center;
`;

const ConfirmMessage = styled.p`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes.normal};
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

// 장소 상세 모달 스타일
const DetailModalContainer = styled.div`
  width: 300px;
  background-color: ${theme.colors.primary};
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xxlarge};
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

const DetailContent = styled.div`
  margin-top: 10px;
`;

const DetailTitle = styled.h3`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.normal};
  margin-bottom: 8px;
`;

const DetailText = styled.p`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.normal};
  margin-bottom: 16px;
  word-break: break-all;
`;

export default {
  ConfirmModal,
  PlaceDetailModal,
};
