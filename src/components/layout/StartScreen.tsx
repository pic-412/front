import { useState, useEffect } from 'react';
import SplashScreen from '@/components/layout/SplashScreen';
import MainCoachMark from '@/components/ui/MainCoachMark';

const ScreenSequence = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showCoach, setShowCoach] = useState(false);

  useEffect(() => {
    // 스플래시 화면 타이머
    const splashTimer = setTimeout(() => {
      setShowSplash(false);

      // 코치마크를 본 적이 없으면 보여주기
      const hasSeenCoachMark = localStorage.getItem('hasSeenCoachMark');
      if (!hasSeenCoachMark) {
        setShowCoach(true);
        localStorage.setItem('hasSeenCoachMark', 'true');
      }
    }, 6000);

    return () => clearTimeout(splashTimer);
  }, []);

  const handleCoachClose = () => {
    setShowCoach(false);
  };

  return (
    <>
      {showSplash && <SplashScreen />}
      {showCoach && <MainCoachMark onClose={handleCoachClose} />}
    </>
  );
};

export default ScreenSequence;
