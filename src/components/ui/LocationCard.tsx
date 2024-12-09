import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from './Button';

interface LocationCardProps {
  name?: string;
  address?: string;
  operatingHours?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name = '장소명',
  address,
  operatingHours,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const hasExpandableContent = address || operatingHours;

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {hasExpandableContent && (
          <Button size="sm" variant={isExpanded ? 'white' : undefined} onClick={toggleExpand}>
            {isExpanded ? '닫기' : '더보기'}
          </Button>
        )}
      </CardHeader>
      <CardContent isExpanded={isExpanded}>
        <ContentInner>
          {address && (
            <InfoRow>
              <InfoLabel>주소</InfoLabel>
              <InfoText>{address}</InfoText>
            </InfoRow>
          )}
          {operatingHours && (
            <InfoRow>
              <InfoLabel>운영시간</InfoLabel>
              <InfoText>{operatingHours}</InfoText>
            </InfoRow>
          )}
        </ContentInner>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  background-color: #98d8b7;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 52px;
`;

const CardTitle = styled.h3`
  color: white;
  min-height: 30px;
  display: flex;
  align-items: center;
  font-size: 18px;
  fonr-weight: bold;
  margin: 0;
`;

const CardContent = styled.div<{ isExpanded: boolean }>`
  background-color: #98d8b7;
  height: ${(props) => (props.isExpanded ? 'auto' : '0')};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  padding-bottom: ${(props) => (props.isExpanded ? '8px' : '0')};
`;

const ContentInner = styled.div`
  padding-top: 1px;
`;

const InfoRow = styled.div`
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid white;
  margin: 0 8px;
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: white;
  font-weight: 500;
  min-width: 80px;
`;

const InfoText = styled.span`
  color: white;
  flex: 1;
`;

export default LocationCard;
