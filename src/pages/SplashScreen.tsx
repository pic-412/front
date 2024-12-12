import React from 'react';
import logo from '@/assets/images/logo.svg';

const SplashScreen = () => {
  // 서버 사이드에서 localStorage 접근 방지
  const hasVisitedBefore = 
    typeof window !== 'undefined' 
    ? localStorage.getItem('hasVisited') 
    : null;

  // 첫 방문인 경우에만 localStorage에 플래그 설정
  if (typeof window !== 'undefined' && !hasVisitedBefore) {
    localStorage.setItem('hasVisited', 'true');
  }

  // 첫 방문이 아니면 null 반환
  if (hasVisitedBefore) return null;

  return (
    <div className="splash-screen">
      <img src={logo} alt="PIG!" />
      <p>사진으로부터 시작되는 제주도 여행</p>
    </div>
  );
};

export default SplashScreen;