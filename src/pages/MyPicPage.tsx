import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import TinderCard from 'react-tinder-card';
import { getMyPic, unlikePlaceById, getPlaceDetails } from '@/api/placeAPI';
import LocationCard from '@/components/ui/LocationCard';
import { ConfirmModal } from '@/components/ui/Modal';
import MypicCoachMark from '@/components/ui/MypicCoachMark';
import { useToast } from '@/components/ui/Toast';

interface LikedPlace {
  id: number;
  name: string;
  address: string;
  time: string;
  imageUrl: string;
  naverUrl: string;
}

const MyPicPage = () => {
  const [likedPlaces, setLikedPlaces] = useState<LikedPlace[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [currentPlace, setCurrentPlace] = useState<LikedPlace | null>(null);
  const [showCoachMark, setShowCoachMark] = useState(false);
  const { showToast, Toast } = useToast();
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const hasVisitedMyPicPage = localStorage.getItem('myPicPageVisited');
    if (!hasVisitedMyPicPage) {
      setShowCoachMark(true);
    }
  }, []);

  const handleCloseCoachMark = () => {
    setShowCoachMark(false);
    localStorage.setItem('myPicPageVisited', 'true');
  };

  useEffect(() => {
    if (token) {
      fetchLikedPlaces();
    }
  }, [token]);

  const fetchLikedPlaces = async () => {
    try {
      const response = await getMyPic(token);
      const places = Array.isArray(response) ? response : [response];
      setLikedPlaces(places);
      setCurrentIndex(0);
    } catch (error) {
      console.error('좋아요한 장소 목록을 가져오는데 실패했습니다', error);
      setLikedPlaces([]);
      showToast('장소 목록을 불러오는데 실패했습니다');
    }
  };

  const handleSwipe = async (direction: string) => {
    if (likedPlaces.length === 0) return;

    if (direction === 'left') {
      const currentPlace = likedPlaces[currentIndex];
      setSelectedPlaceId(currentPlace.id);
      setIsModalOpen(true);
    }

    if (direction === 'right') {
      // Move to next place
      const nextIndex = (currentIndex + 1) % likedPlaces.length;
      setCurrentIndex(nextIndex);
    }
  };

  const handleCardClick = async () => {
    if (likedPlaces.length === 0) return;
    try {
      const currentPlace = likedPlaces[currentIndex];
      const details = await getPlaceDetails(currentPlace.id);
      setCurrentPlace(details);
    } catch (error) {
      console.error('장소 상세 정보를 가져오는데 실패했습니다', error);
      showToast('장소 정보를 불러오는데 실패했습니다');
    }
  };

  const handleUnlike = async () => {
    if (selectedPlaceId) {
      try {
        await unlikePlaceById(selectedPlaceId, token);
        const updatedPlaces = likedPlaces.filter((place) => place.id !== selectedPlaceId);
        setLikedPlaces(updatedPlaces);
        console.log('updatedPlaces:', updatedPlaces);
        showToast('마이픽이 삭제되었습니다', 'success');
        if (currentIndex >= updatedPlaces.length) {
          setCurrentIndex(updatedPlaces.length > 0 ? updatedPlaces.length - 1 : 0);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error('좋아요 취소에 실패했습니다', error);
        showToast('마이픽 삭제에 실패했습니다', 'error');
      }
    }
  };

  if (!token) {
    return (
      <LoginMessage>
        로그인을 하고, <br />
        <br />
        <br />
        저장한 My Pic을 모아보세요.
      </LoginMessage>
    );
  }

  if (likedPlaces.length === 0) {
    return <LoginMessage>MyPic 을 저장하세요.</LoginMessage>;
  }

  return (
    <PageWrapper>
      <Toast />
      <CardContainer>
        {likedPlaces.map((place, index) => (
          <StyledTinderCard
            key={place.id}
            onSwipe={handleSwipe}
            preventSwipe={['up', 'down']}
            className={index === currentIndex ? 'active' : 'inactive'}
          >
            <PlaceCard
              onClick={handleCardClick}
              style={{ backgroundImage: `url(${place.imageUrl})` }}
            />
          </StyledTinderCard>
        ))}
      </CardContainer>

      {currentPlace && (
        <DetailsOverlay onClick={() => setCurrentPlace(null)}>
          <DetailsWrapper onClick={(e) => e.stopPropagation()}>
            <LocationCard
              name={currentPlace.name}
              address={currentPlace.address}
              time={currentPlace.time}
              imageUrl={currentPlace.imageUrl}
              naverUrl={currentPlace.naverUrl}
              onClose={() => setCurrentPlace(null)}
            />
          </DetailsWrapper>
        </DetailsOverlay>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleUnlike}
        message="정말 마이픽을 취소할까요?"
      />

      {showCoachMark && <MypicCoachMark onClose={handleCloseCoachMark} />}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTinderCard = styled(TinderCard)`
  position: absolute;
  width: 95%;
  height: 80vh;
`;

const PlaceCard = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const DetailsOverlay = styled.div`
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

const DetailsWrapper = styled.div`
  width: 90%;
  max-width: 400px;
`;

const LoginMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #666;
`;

export default MyPicPage;
