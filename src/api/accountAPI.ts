import axios from 'axios';

interface UserData {
  email: string;
  password: string;
  password_check?: string;
}

export const signUp = async (userData: UserData) => {
  try {
    const response = await axios.post('http://211.188.59.221/api/accounts/', userData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('회원가입에 실패했습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error('회원가입 중 오류가 발생했습니다.');
    }
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};

export const signIn = async (userData: UserData) => {
  try {
    const response = await axios.post('http://211.188.59.221/api/accounts/signin', userData);
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
