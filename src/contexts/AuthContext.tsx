import { AxiosError } from 'axios';
import { router } from 'expo-router';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { queryClient } from '@/app/_layout';
import { IImageUpload } from '@/dtos/ComplaintDTO';
import { UserDTO } from '@/dtos/UserDTO';
import { fetchMyUser } from '@/queries/auth';
import { getGroups } from '@/queries/groups';
import { createSession, updateAvatar } from '@/queries/mutations/auth';
import { api } from '@/services/api';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@/storage/storageUser';
import { handleError } from '@/utils/handleError';

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
      setIsLoadingUserStorageData(true);
      const data = await createSession({ email, password });

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(
          data.user,
          data.token,
          data.refresh_token,
        );
        userAndTokenUpdate(data.user, data.token);
      }

      const isRedirect = await getAndSetGroups();

      if (isRedirect) {
        return;
      }

      router.replace('/');
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

      router.replace('/sign-in');
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

      await getAndSetGroups();
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserAvatar(avatar: IImageUpload): Promise<void> {
    try {
      await updateAvatar(avatar);

      const myUser = await fetchMyUser();

      await storageUserSave(myUser);
      setUser(myUser);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleError(new Error('Erro ao atualizar foto de perfil'));
      }
    }
  }

  async function getAndSetGroups() {
    const groups = await getGroups();
    queryClient.setQueryData(['groups'], groups);

    let isRedirect = false;

    if (!groups.length) {
      isRedirect = true;
      router.replace('/groups/');
    }

    return isRedirect;
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
