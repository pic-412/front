import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import TinderCard from 'react-tinder-card';
import { getMyPic, unlikePlaceById, getPlaceDetails } from '@/api/placeAPI';
import LocationCard from '@/components/ui/LocationCard';
import { ConfirmModal } from '@/components/ui/Modal';
import CoachMark from '@/components/ui/CoachMark';

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
  const [currentPlace, setCurrentPlace] = useState<LikedPlace | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const token = localStorage.getItem('token') || '';
  const [showCoachMark, setShowCoachMark] = useState(false);

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
  }, []);

  const fetchLikedPlaces = async () => {
    try {
      const response = await getMyPic(token);
      const places = Array.isArray(response) ? response : [response];
      setLikedPlaces(places);
    } catch (error) {
      console.error('좋아요한 장소 목록을 가져오는데 실패했습니다', error);
      setLikedPlaces([]);
    }
  };

  const handleSwipe = async (direction: string, placeId: number) => {
    if (direction === 'left') {
      setSelectedPlaceId(placeId);
      setIsModalOpen(true);
    }
  };

  const handleCardClick = async (place: LikedPlace) => {
    try {
      const details = await getPlaceDetails(place.id);
      setCurrentPlace(details);
    } catch (error) {
      console.error('장소 상세 정보를 가져오는데 실패했습니다', error);
    }
  };

  const handleUnlike = async () => {
    if (selectedPlaceId) {
      try {
        await unlikePlaceById(selectedPlaceId, token);
        setLikedPlaces((places) => places.filter((place) => place.id !== selectedPlaceId));
        setIsModalOpen(false);
      } catch (error) {
        console.error('좋아요 취소에 실패했습니다', error);
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
      <CardContainer>
        {likedPlaces.map((place) => (
          <StyledTinderCard
            key={place.id}
            onSwipe={(dir) => handleSwipe(dir, place.id)}
            preventSwipe={['up', 'down']}
          >
            <PlaceCard
              onClick={() => handleCardClick(place)}
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
      {showCoachMark && <CoachMark pageName="mypic" onClose={handleCloseCoachMark} />}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  overflow: hidden;
`;

const CardContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTinderCard = styled(TinderCard)`
  width: 95%;
  height: 80vh;
  position: absolute;
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
  max-width: 500px;
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
