import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser';

import { IImageUpload } from '@dtos/ProductDTO';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import { handleError } from '@utils/handleError';
import { AxiosError } from 'axios';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserAvatar: (avatar: IImageUpload) => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(userData);
  }

  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refreshToken: string,
  ) {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({ token, refreshToken });
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(
          data.user,
          data.token,
          data.refresh_token,
        );
        userAndTokenUpdate(data.user, data.token);
      }
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }, []);

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserAvatar(avatar: IImageUpload): Promise<void> {
    try {
      const body = new FormData();
      body.append('_method', 'PUT');
      body.append('avatar', avatar as any);

      await api.postForm('/users/avatar', body);

      const response = await api.get<UserDTO>('/users/me');

      await storageUserSave(response.data);
      setUser(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleError(new Error('Erro ao atualizar foto de perfil'));
      }
    }
  }

  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, []);

  const contextReturnValues = useMemo<AuthContextDataProps>(() => {
    return {
      user,
      signIn,
      signOut,
      updateUserAvatar,
      isLoadingUserStorageData,
    };
  }, [isLoadingUserStorageData, signIn, user]);

  return (
    <AuthContext.Provider value={contextReturnValues}>
      {children}
    </AuthContext.Provider>
  );
}
