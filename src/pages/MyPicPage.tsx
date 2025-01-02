import React, { useState, useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';

import { getMyPic, unlikePlaceById, getPlaceDetails } from '@/api/placeAPI';
import Button from '@/components/ui/Button';
import LocationCard from '@/components/ui/LocationCard';
import { ConfirmModal } from '@/components/ui/Modal';
import MypicCoachMark from '@/components/ui/MypicCoachMark';
import { useToast } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/authStore';
import theme from '@/styles/theme';

interface LikedPlace {
  id: number;
  name: string;
  address: string;
  time: string;
  imageUrl: string;
  naverUrl: string;
  latitude: number;
  longitude: number;
}

const MyPicPage = () => {
  const [likedPlaces, setLikedPlaces] = useState<LikedPlace[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [currentPlace, setCurrentPlace] = useState<LikedPlace | null>(null);
  const [showCoachMark, setShowCoachMark] = useState(false);
  const { showToast, Toast } = useToast();
  const { token, isAuthenticated } = useAuthStore();

  // 터치 및 클릭 상태 관리를 위한 ref와 상태
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    if (likedPlaces.length === 0 || isAnimating) return;

    setIsAnimating(true);

    if (direction === 'left') {
      const currentPlace = likedPlaces[currentIndex];
      setSelectedPlaceId(currentPlace.id);
      setIsModalOpen(true);
    } else if (direction === 'right') {
      const nextIndex = (currentIndex + 1) % likedPlaces.length;
      setCurrentIndex(nextIndex);
    }

    // 애니메이션 후 상태 초기화
    setTimeout(async () => {
      await fetchLikedPlaces();
      setIsAnimating(false);
    }, 300);
  };

  const handleCardClick = async () => {
    if (likedPlaces.length === 0 || isAnimating) return;

    try {
      const currentPlace = likedPlaces[currentIndex];
      const details = await getPlaceDetails(currentPlace.id);
      setCurrentPlace(details);
    } catch (error) {
      console.error('장소 상세 정보를 가져오는데 실패했습니다', error);
      showToast('장소 정보를 불러오는데 실패했습니다');
    }
  };

  // 모바일 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;

    const diffX = touchStartX.current - touchEndX.current;
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 0;
    const swipeThreshold = cardWidth * 0.3; // 카드 너비의 30%를 스와이프 임계값으로 설정

    if (Math.abs(diffX) > swipeThreshold) {
      // 충분히 멀리 스와이프한 경우
      handleSwipe(diffX > 0 ? 'left' : 'right');
    } else if (Math.abs(diffX) < 10) {
      // 거의 움직이지 않은 경우 (클릭으로 간주)
      handleCardClick();
    }
  };

  const handleUnlike = async () => {
    if (selectedPlaceId) {
      try {
        await unlikePlaceById(selectedPlaceId, token);
        const updatedPlaces = likedPlaces.filter((place) => place.id !== selectedPlaceId);
        setLikedPlaces(updatedPlaces);
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

  const navigate = useNavigate();
  const handleSignin = () => {
    navigate('/signin');
  };

  if (!token) {
    return (
      <LoginMessage>
        <h1>로그인 후 이용하기</h1>
        <LoginButton onClick={handleSignin}>로그인하기</LoginButton>
      </LoginMessage>
    );
  }

  const handleGoMain = () => {
    navigate('/');
  };

  if (likedPlaces.length === 0) {
    return (
      <NoPic>
        <p>PIC한 사진이 없어요 :(</p>
        <span>마음에 드는 제주의 장소를 골라보세요.</span>
        <div onClick={handleGoMain}>메인 페이지로 가기</div>
      </NoPic>
    );
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
              ref={cardRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleCardClick}
              $isAnimating={isAnimating}
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
              latitude={currentPlace.latitude}
              longitude={currentPlace.longitude}
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

// 스타일드 컴포넌트에 애니메이션 추가
const PlaceCard = styled.div<{ $isAnimating?: boolean }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.$isAnimating &&
    `
    transform: scale(0.9) rotate(${Math.random() * 10 - 5}deg);
    opacity: 0.7;
  `}
`;

// 나머지 스타일드 컴포넌트들은 이전과 동일
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.primary};
  gap: 50px;
`;

const LoginButton = styled(Button)`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  padding: 10px;
  font-size: 16px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
`;

const NoPic = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.7;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 29px;
  font-weight: 400;
  color: ${theme.colors.primary};
  span {
    font-size: 16px;
    font-weight: 400;
  }
  div {
    cursor: pointer;
    margin-top: 30px;
    color: ${theme.colors.black};
    text-decoration: underline;
    font-size: 22px;
  }
`;

export default MyPicPage;
