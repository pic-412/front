import { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Separator from '@/components/ui/Separator';
import theme from '@/styles/theme';
import { deleteAccount, updateProfile } from '@/api/accountAPI';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '@/components/ui/Modal';

import PasswordInput from '@/components/ui/ShowPassword';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [userInfo, setUserInfo] = useState<{
    nickname: string;
    password: string;
    passwordCheck: string;
  }>({
    nickname: '',
    password: '',
    passwordCheck: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validatePasswords = () => {
    const hasPassword = password.trim() !== '';
    const hasPasswordCheck = passwordCheck.trim() !== '';

    if (hasPassword !== hasPasswordCheck) {
      alert('비밀번호와 비밀번호 확인은 모두 입력하거나 모두 비워두어야 합니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validatePasswords()) {
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
        return;
      }

      if (!validatePasswords()) {
        return;
      }

      const { nickname } = userInfo;
      await updateProfile(token, nickname, password || undefined, passwordCheck || undefined);

      setIsModalOpen(false);
      navigate('/profile');
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert(error instanceof Error ? error.message : '프로필 업데이트에 실패했습니다.');
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleteAccountModalOpen(true);
    setDeleteErrorMessage(''); // Reset any previous error messages
  };

  const confirmDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('로그인 정보가 없습니다. 다시 로그인해주세요.');
    }
    const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    await deleteAccount(formattedToken);
    localStorage.removeItem('token');
    navigate('/signin', { state: { message: '계정이 성공적으로 탈퇴되었습니다.' } });
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
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </UserInfoWrapper>
          <Separator size="sm" />
          <UserInfoWrapper>
            <UserInfoLabel>비밀번호확인</UserInfoLabel>
            <PasswordInput
              placeholder="비밀번호확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
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

        {deleteErrorMessage && <ErrorMessage>{deleteErrorMessage}</ErrorMessage>}
      </ProfileWrapper>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
        message="프로필을 수정하시겠습니까?"
      />
      <ConfirmModal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
        onConfirm={confirmDeleteAccount}
        message="정말 탈퇴하시겠습니까?"
      />
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

export default ProfileEditPage;
