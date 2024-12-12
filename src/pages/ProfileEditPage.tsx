import { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Separator from '@/components/ui/Separator';
import theme from '@/styles/theme';
import { deleteAccount } from '@/api/accountAPI';
import { Navigate } from 'react-router-dom';

const ProfileEditPage = () => {
  const [userInfo, setUserInfo] = useState({});

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Handle form submission and update user profile
    console.log('Submitting user info:', userInfo);
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      if (window.confirm('정말 탈퇴하시겠습니까?')) {
        await deleteAccount(token);
        localStorage.removeItem('token');
        Navigate('/signin');
      }
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
    }
  };

  return (
    <>
      <ProfileWrapper>
        <UserInfoSection>
          <UserInfoWrapper>
            <UserInfoLabel>닉네임</UserInfoLabel>
            <Input name="nickname" value={userInfo.nickname} onChange={handleInputChange} />
          </UserInfoWrapper>
          <Separator size="sm" />
          <UserInfoWrapper>
            <UserInfoLabel>비밀번호</UserInfoLabel>
            <Input name="password" value={userInfo.password} onChange={handleInputChange} />
          </UserInfoWrapper>
          <Separator size="sm" />
          <UserInfoWrapper>
            <UserInfoLabel>비밀번호확인</UserInfoLabel>
            <Input
              name="passwordCheck"
              value={userInfo.passwordCheck}
              onChange={handleInputChange}
            />
          </UserInfoWrapper>
        </UserInfoSection>
        <Separator size="lg" />

        <Button size="md" onClick={handleSubmit}>
          저장
        </Button>

        <DeleteAccount onClick={handleDeleteAccount}>
          <span>계정탈퇴</span>
        </DeleteAccount>
      </ProfileWrapper>
    </>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const UserInfoSection = styled.div`
  flex-grow: 1;
`;

const UserInfoWrapper = styled.div`
  margin-bottom: 16px;
  text-align: left;
  margin-bottom: 16px;
  width: 100%;
`;

const UserInfoLabel = styled.label`
  display: block;
  color: ${theme.colors.darkGray};
  margin-bottom: 10px;
`;

const DeleteAccount = styled.div`
  color: ${theme.colors.darkGray};
  cursor: pointer;
  margin-top: 20px;
`;

export default ProfileEditPage;
