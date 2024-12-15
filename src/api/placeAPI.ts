import axios from 'axios';

interface RandomPlace {
  id: number;
  imageUrl: string;
}

interface PlaceDetails {
  id: number;
  name: string;
  address: string;
  time: string;
  imageUrl: string;
  naverUrl: string;
}

interface PlaceImage {
  id: number;
  imageUrl: string;
}

interface MyPicPlace {
  id: number;
  name: string;
  address: string;
  time: string;
  imageUrl: string;
  naverUrl: string;
}

// 랜덤 장소 가져오기
export const getRandomPlace = async (): Promise<RandomPlace> => {
  try {
    const response = await axios.get<RandomPlace>('/api/places/places/random/');
    return response.data;
  } catch (error) {
    console.error('랜덤 장소를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 장소 ID로 세부 정보 가져오기
export const getPlaceDetails = async (placeId: number): Promise<PlaceDetails> => {
  try {
    const response = await axios.get<PlaceDetails>(`/api/places/places/${placeId}/`);
    return response.data;
  } catch (error) {
    console.error('장소 세부 정보를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

export const likePlaceById = async (placeId: number, token: string): Promise<void> => {
  try {
    await axios.post(
      `/api/places/places/${placeId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
      }
    );
  } catch (error) {
    console.error('장소 좋아요 추가 중 오류 발생:', error);
    throw error;
  }
};

export const unlikePlaceById = async (placeId: number, token: string): Promise<void> => {
  try {
    await axios.delete(`/api/places/places/${placeId}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    });
  } catch (error) {
    console.error('장소 좋아요 삭제 중 오류 발생:', error);
    throw error;
  }
};

export const getPlaceImages = async (token: string): Promise<PlaceImage[]> => {
  try {
    const response = await axios.get<PlaceImage[]>('/api/places/places/pic', {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('장소 이미지 목록을 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 좋아요한 장소 목록 가져오기
export const getMyPic = async (token: string): Promise<MyPicPlace[]> => {
  try {
    const response = await axios.get('/api/places/places/pic', {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    });

    // 응답 데이터가 배열인지 확인하고 처리
    const data = response.data;
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('좋아요한 장소 목록을 가져오는 중 오류 발생:', error);
    throw error;
  }
};
