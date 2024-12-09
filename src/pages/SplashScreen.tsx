import logo from '@/assets/images/logo.svg';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={logo} alt="PIG!" />
      <p>사진으로부터 시작되는 제주도 여행</p>
    </div>
  );
};

export default SplashScreen;
