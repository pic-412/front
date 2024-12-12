import axios from 'axios';

interface UserData {
  email: string;
  password: string;
  password_check?: string;
}

interface AuthResponse {
  access: string;
  token: string;
}

interface UserProfile {
  email: string;
  nickname: string;
}
export const signUp = async (userData: UserData) => {
  try {
    const response = await axios.post('https://211.188.59.221/api/accounts/', userData);

    // 응답 로깅
    console.log('signUp 응답:', response);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('회원가입에 실패했습니다.');
    }
  } catch (error) {
    console.error('signUp 에러:', error);

    if (axios.isAxiosError(error)) {
      // 서버에서 보내온 에러 메시지 추출
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        '회원가입 중 오류가 발생했습니다.';
      throw new Error(errorMessage);
    }

    throw new Error('네트워크 오류가 발생했습니다.');
  }
};

export const signIn = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await axios.post('https://211.188.59.221/api/accounts/signin', userData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('로그인에 실패했습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error('로그인 중 오류가 발생했습니다.');
    }
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};

export const getProfile = async (token: string): Promise<UserProfile> => {
  try {
    const response = await axios.get('https://211.188.59.221/api/accounts/profile', {
      headers: {
        Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('프로필 조회에 실패했습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error('프로필 조회 중 오류가 발생했습니다.');
    }
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};

export const deleteAccount = async (token: string): Promise<void> => {
  try {
    const response = await axios.delete('https://211.188.59.221/api/accounts/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('회원탈퇴에 실패했습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error('회원탈퇴 중 오류가 발생했습니다.');
    }
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};
