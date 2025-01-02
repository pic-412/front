import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import Button from '@/components/ui/Button';

interface LocationCardProps {
  name: string;
  address: string;
  time: string;
  imageUrl: string;
  naverUrl: string;
  latitude: number;
  longitude: number;
  onClose: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  address,
  time,
  naverUrl,
  latitude,
  longitude,
  imageUrl,
  onClose,
}) => {
  const handleMapClick = () => {
    window.open(naverUrl, '_blank');
  };
  const mapElement = useRef(null);
  const [isNaverLoaded, setIsNaverLoaded] = useState(false);
  useEffect(() => {
    const checkNaverMaps = () => {
      if (window.naver && window.naver.maps) {
        setIsNaverLoaded(true);
      } else {
        setTimeout(checkNaverMaps, 500);
      }
    };

    checkNaverMaps();
  }, []);

  useEffect(() => {
    if (!mapElement.current || !isNaverLoaded) return;

    try {
      const location = new window.naver.maps.LatLng(latitude, longitude);
      const mapOptions = {
        center: location,
        zoom: 15,
        zoomControl: true,
      };

      const map = new window.naver.maps.Map(mapElement.current, mapOptions);

      new window.naver.maps.Marker({
        position: location,
        map,
      });
    } catch (error) {
      console.error('Map initialization error:', error);
    }
  }, [latitude, longitude, isNaverLoaded]);

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ContentInner>
          {time && (
            <InfoRow>
              <InfoLabel>운영시간</InfoLabel>
              <InfoText>{time}</InfoText>
            </InfoRow>
          )}
          {address && (
            <InfoRow>
              <InfoLabel>주소</InfoLabel>
              <InfoText>{address}</InfoText>
            </InfoRow>
          )}
          <MapContainer onClick={handleMapClick} ref={mapElement} />
          <CloseButton size="sm" onClick={onClose}>
            닫기
          </CloseButton>
        </ContentInner>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  flex-direction: column;
  display: flex;
  margin: 0 auto;
`;

const CardHeader = styled.div`
  background-color: #98d8b7;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 52px;
`;

const MapContainer = styled.div`
  width: calc(100% - 16px);
  height: 200px;
  margin: 8px;
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

const CardContent = styled.div`
  background-color: #98d8b7;
  height: auto;
  overflow: hidden;
  padding-bottom: 8px;
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

const InfoContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const MapButton = styled(Button)`
  font-size: 12px;
  width: 58px;
  height: 27px;
  border: 1px solid white;
  border-radius: 8px;
  margin-left: 10px;
`;

const CloseButton = styled(Button)`
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  height: 32px;
  width: 128px;
  border-radius: 10px;
`;

export default LocationCard;
