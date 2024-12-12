import { ConfirmModal, PlaceDetailModal } from '@/components/ui/Modal';

const MyPicPage = () => {
  return (
    <>
      <ConfirmModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        message="정말 삭제하시겠습니까?"
      />
      <PlaceDetailModal
        isOpen={true}
        onClose={() => {}}
        placeName="이디야커피"
        address="서울특별시 강남구 역삼동 123-45"
        operatingHours="10:00 ~ 22:00"
      />
    </>
  );
};

export default MyPicPage;
