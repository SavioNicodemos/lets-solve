/* eslint-disable no-async-promise-executor */
import axios, { AxiosError, AxiosInstance } from 'axios';
import { getLocales } from 'expo-localization';

import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken';
import { AppError } from '@/utils/AppError';
import { env } from '@/utils/env';

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const locales = getLocales();
const languageCode = locales?.[0].languageCode;

const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Accept-Language': languageCode,
  },
}) as APIInstanceProps;

let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = singOut => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response,
    async requestError => {
      if (requestError.response?.status === 401) {
        // NOTE: This message always needs to be the same as the one in the backend
        // So if copy this file to other project, check the message or when change
        // the message in the backend, change here too
        if (requestError.response.data?.message === 'Unauthenticated.') {
          const { refreshToken } = await storageAuthTokenGet();

          if (!refreshToken) {
            singOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueued.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/sessions/refresh-token', {
                refresh_token: refreshToken,
              });

              await storageAuthTokenSave({
                token: data.token,
                refreshToken: data.refresh_token,
              });

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              };
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

              failedQueued.forEach(request => {
                request.onSuccess(data.token);
              });

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedQueued.forEach(request => {
                request.onFailure(error);
              });

              singOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueued = [];
            }
          });
        }

        singOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      }
      return Promise.reject(requestError);
    },
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
