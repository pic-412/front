import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { signIn, getProfile } from '@/api/accountAPI';

interface User {
  email: string;
  nickname: string;
}

interface AuthResponse {
  refresh: string;
  access: string;
}

interface AuthState {
  token: string | null;
  access_token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      access_token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setUser: (user: User) => {
        set({ user });
      },
      login: async (email: string, password: string) => {
        try {
          const response = await signIn({ email, password });
          console.log('로그인 응답:', response);

          const { refresh, access } = response;

          // 토큰 저장
          set({
            token: access,
            refreshToken: refresh,
            isAuthenticated: true,
          });

          // 유저 정보 가져오기
          const userProfile = await getProfile(access);
          set({ user: userProfile });

          // 토큰 자동 갱신 설정
          setTimeout(
            () => {
              get().refreshAccessToken();
            },
            60 * 1000 * 4.5
          );
        } catch (error) {
          console.error('로그인 에러:', error);
          throw error;
        }
      },
      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
        // localStorage 전체 제거가 아닌 auth 관련 항목만 제거
        localStorage.removeItem('auth-storage');
      },

      refreshAccessToken: async () => {
        try {
          const { refreshToken } = get();
          console.log('토큰 리프레시 시도:', new Date().toISOString());
          console.log('현재 토큰:', get().token);
          console.log('현재 리프레시 토큰:', refreshToken);

          if (!refreshToken) {
            console.log('리프레시 토큰 없음 - 로그아웃');
            get().logout();
            return;
          }
          const response = await axios.post('https://www.pic064.site/api/accounts/token_refresh', {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          console.log('새로운 액세스 토큰 발급 성공:', newAccessToken.slice(0, 10) + '...');
          set({ token: newAccessToken });

          // 다음 갱신 시간 로그
          const nextRefresh = new Date(Date.now() + 10000);
          console.log('다음 리프레시 예정 시간:', nextRefresh.toISOString());

          setTimeout(
            () => {
              get().refreshAccessToken();
            },
            60 * 1000 * 4.5
          );
        } catch (error) {
          console.error('토큰 리프레시 실패:', error);
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
