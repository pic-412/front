import { ConfirmModal } from '@/components/ui/Modal';
import { useState } from 'react';

const MyPicPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // 확인 처리 로직
    setIsModalOpen(false);
  };

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message="정말 마이픽을 취소할까요?"
      />
    </>
  );
};

export default MyPicPage;
