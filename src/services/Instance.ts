import axios, { AxiosError } from 'axios';
import { ApiError, NetworkError } from './Errors';
import { tokenStorage } from './TokenStorage';
 
const BASE_URL = 'http://localhost:3000';
 
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 
interface ApiErrorBody {
  statusCode: number;
  message: string | string[];
  error: string;
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    if (!error.response) {
      return Promise.reject(new NetworkError());
    }
 
    const { status, data } = error.response;
 
    if (status === 401) {
      tokenStorage.clear();
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
 
    return Promise.reject(
      new ApiError(
        Array.isArray(data?.message) ? data.message[0] : (data?.message ?? `Error ${status}`),
        status,
        data?.message,
      ),
    );
  },
);