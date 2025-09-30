import { getConfig } from '@/config/getConfig';
import { RoutesMap } from '@/constants';
import useAuthStore from '@/store/authStore';
import { createAxiosClient } from './createAxiosClient';

const { apiUrl: BASE_URL } = getConfig();
function getCurrentAccessToken() {
  return useAuthStore.getState().accessToken ?? '';
}

function getCurrentRefreshToken() {
  return useAuthStore.getState().refreshToken ?? '';
}

function setRefreshedTokens(tokens: {
  accessToken: string;
  refreshToken: string;
}) {
  useAuthStore.getState().login(tokens);
}

async function logout() {
  useAuthStore.getState().logout();

  setTimeout(() => {
    window.location.replace(RoutesMap.AUTH.SIGN_IN);
  }, 0);
}

export const axiosInstant = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  logout,
  setRefreshedTokens,
});
