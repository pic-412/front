import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Separator from '@/components/ui/Separator';
import theme from '@/styles/theme';

const ProfileEditPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: 'abc123@naver.com',
    nickname: 'abc123',
    password: '',
    passwordCheck: '',
  });

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
        <DeleteAccount>
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
