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
}

// 랜덤 장소 가져오기
export const getRandomPlace = async (): Promise<RandomPlace> => {
  try {
    const response = await axios.get<RandomPlace>(
      'https://211.188.59.221/api/places/places/random/'
    );
    return response.data;
  } catch (error) {
    console.error('랜덤 장소를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 장소 ID로 세부 정보 가져오기
export const getPlaceDetails = async (placeId: number): Promise<PlaceDetails> => {
  try {
    const response = await axios.get<PlaceDetails>(
      `https://211.188.59.221/api/places/places/${placeId}/`
    );
    return response.data;
  } catch (error) {
    console.error('장소 세부 정보를 가져오는 중 오류 발생:', error);
    throw error;
  }
};
