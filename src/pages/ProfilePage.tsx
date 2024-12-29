import { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '@/api/accountAPI';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import { useAuthStore } from '@/store/authStore';
import theme from '@/styles/theme';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuthStore();

  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        const data = await getProfile(token);
        setUserInfo(data);
      }
    };
    fetchProfile();
  }, [token]);

  const handleEdit = () => {
    navigate('/profile/edit');
  };

  const handleLogout = () => {
    const {logout} = useAuthStore.getState();
    logout();
    navigate('/');
  };

  const handleMypic = () => {
    navigate('/mypic');
  };

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

  return (
    <>
      <ProfileWrapper>
        <UserInfoSection>
          <UserInfoWrapper>
            <UserInfoLabel>내 계정</UserInfoLabel>
            <UserInfoValue>{userInfo.email}</UserInfoValue>
          </UserInfoWrapper>
          <Separator size="sm" />
          <UserInfoWrapper>
            <UserInfoLabel>내 정보</UserInfoLabel>
            <UserEditWrapper>
              <UserInfoValue>{userInfo.nickname}</UserInfoValue>
              <EditButton variant="white" onClick={handleEdit}>
                수정하기
              </EditButton>
            </UserEditWrapper>
          </UserInfoWrapper>
          <Separator size="sm" />
          <UserInfoWrapper>
            <UserInfoLabel>마이픽</UserInfoLabel>
            <UserEditWrapper>
              <UserInfoValue></UserInfoValue>
              <EditButton variant="white" onClick={handleMypic}>
                보러가기
              </EditButton>
            </UserEditWrapper>
          </UserInfoWrapper>
        </UserInfoSection>
        <ButtonSection>
          <LogoutButton variant="default" size="lg" onClick={handleLogout}>
            로그아웃
          </LogoutButton>
        </ButtonSection>
      </ProfileWrapper>
    </>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70vh;
  padding: 20px;
`;

const UserInfoSection = styled.div`
  flex-grow: 1;
`;

const UserInfoWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  text-align: left;
`;

const UserEditWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EditButton = styled(Button)`
  font-size: 12px;
  width: 90px;
  height: 25px;
  border: 1px solid ${theme.colors.darkGray};
  border-radius: 14px;
`;

const UserInfoLabel = styled.label`
  display: block;
  color: ${theme.colors.darkGray};
  margin-bottom: 10px;
`;

const UserInfoValue = styled.div`
  color: ${theme.colors.darkGray};
`;

const LogoutButton = styled(Button)`
  width: 100%;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
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
export default ProfilePage;
