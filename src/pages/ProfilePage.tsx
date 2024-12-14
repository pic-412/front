import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { getProfile } from '@/api/accountAPI';
import Button from '@/components/ui/Button';
import theme from '@/styles/theme';
import Separator from '@/components/ui/Separator';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        const data = await getProfile(token);
        setUserInfo(data);
      } catch {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleEdit = () => {
    navigate('/profile/edit');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleMypic = () => {
    navigate('/mypic');
  };
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
            <UserInfoLabel>MY PIC</UserInfoLabel>
            <EditButton variant="white" onClick={handleMypic}>
              보러가기
            </EditButton>
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

export default ProfilePage;
