import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import TinderCard from 'react-tinder-card';
import { getRandomPlace, getPlaceDetails, likePlaceById } from '@/api/placeAPI';
import CoachMark from '@/components/ui/CoachMark';
import LocationCard from '@/components/ui/LocationCard';
import SignupOverlay from '@/components/ui/SignupOverlay';
import logo from '@/assets/images/logo.svg';

interface RandomPlace {
  id: number;
  imageUrl: string;
}

interface PlaceDetails {
  id: number;
  name: string;
  address: string;
  time: string;
  imageUrl: string;
}

const MainPage = () => {
  const [places, setPlaces] = useState<RandomPlace[]>([]);
  const [currentPlaceDetails, setCurrentPlaceDetails] = useState<PlaceDetails | null>(null);
  const [isSignupOverlayOpen, setIsSignupOverlayOpen] = useState(false);
  const token = localStorage.getItem('token') || '';
  const [showCoachMark, setShowCoachMark] = useState(false);

  const fetchMorePlace = async () => {
    try {
      const newPlace = await getRandomPlace();
      setPlaces((prev) => [...prev, newPlace]);
    } catch (error) {
      console.error('장소를 가져오는 데 실패했습니다', error);
    }
  };

  useEffect(() => {
    const hasVisitedMainPage = localStorage.getItem('mainPageVisited');
    if (!hasVisitedMainPage) {
      setShowCoachMark(true);
    }
  }, []);

  const handleCloseCoachMark = () => {
    setShowCoachMark(false);
    localStorage.setItem('mainPageVisited', 'true');
  };

  useEffect(() => {
    const fetchInitialPlaces = async () => {
      try {
        const fetchedPlaces = await Promise.all([getRandomPlace()]);
        setPlaces(fetchedPlaces.reverse());
      } catch (error) {
        console.error('랜덤 장소들을 가져오는 데 실패했습니다', error);
      }
    };

    fetchInitialPlaces();
  }, []);

  const fetchPlaceDetails = async (placeId: number) => {
    try {
      const details = await getPlaceDetails(placeId);
      setCurrentPlaceDetails(details);
    } catch (error) {
      console.error('장소 상세 정보를 가져오는 데 실패했습니다', error);
    }
  };
  const onSwipe = async (direction: string, placeId: number) => {
    if (direction === 'right') {
      if (!token) {
        setIsSignupOverlayOpen(true);
        return;
      }

      try {
        await likePlaceById(placeId, token);
        await fetchPlaceDetails(placeId);
        console.log('좋아요 추가 성공');
      } catch (error) {
        console.error('좋아요 추가 실패:', error);
      }
    }
    await fetchMorePlace();
  };

  const onCardLeftScreen = (placeId: number) => {
    setPlaces((prev) => prev.filter((place) => place.id !== placeId));
  };

  const handleCloseSignupOverlay = () => {
    setIsSignupOverlayOpen(false);
  };

  const handleConfirmSignup = () => {
    setIsSignupOverlayOpen(false);
    // 회원가입 페이지로 이동
  };
  return (
    <PageWrapper>
      <MainContentSection>
        <CardContainer>
          {places.map((place) => (
            <StyledTinderCard
              key={`place-${place.id}`}
              onSwipe={(dir) => onSwipe(dir, place.id)}
              onCardLeftScreen={() => onCardLeftScreen(place.id)}
              preventSwipe={['up', 'down']}
            >
              <PlaceCard>
                <Logo src={logo} alt="Logo" />
                <PlaceImage
                  style={{
                    backgroundImage: `url(${place.imageUrl})`,
                  }}
                />
              </PlaceCard>
            </StyledTinderCard>
          ))}
        </CardContainer>

        {currentPlaceDetails && (
          <DetailsOverlay onClick={() => setCurrentPlaceDetails(null)}>
            <DetailsWrapper onClick={(e) => e.stopPropagation()}>
              <LocationCard
                name={currentPlaceDetails.name}
                address={currentPlaceDetails.address}
                time={currentPlaceDetails.time}
                imageUrl={currentPlaceDetails.imageUrl}
                naverUrl={''}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </DetailsWrapper>
          </DetailsOverlay>
        )}

        {isSignupOverlayOpen && (
          <SignupOverlay
            isOpen={isSignupOverlayOpen}
            onClose={handleCloseSignupOverlay}
            onConfirm={handleConfirmSignup}
          />
        )}
      </MainContentSection>{' '}
      {showCoachMark && <CoachMark pageName="main" onClose={handleCloseCoachMark} />}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  overflow: hidden;
`;

const MainContentSection = styled.div``;

const CardContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTinderCard = styled(TinderCard)`
  width: 95%;
  height: 80vh;
`;
const PlaceCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white; // 하얀색 배경 추가
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;

  // 로고를 위한 중앙 배치 스타일
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  z-index: 2; // 로고 위에 올라오도록
`;

const Logo = styled.img`
  width: 100px; // 로고 크기 조절
  height: auto;
  opacity: 0.5; // 로고 투명도 조절
  z-index: 1;
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

export default MainPage;
