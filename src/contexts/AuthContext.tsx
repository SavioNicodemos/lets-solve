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

import { useQueryClient } from '@tanstack/react-query';
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
import { AuthContextDataProps } from '@/features/auth/types';
import { UserDTO } from '@/features/users/types';
import { createSession } from '@/features/auth/api';
import { IImageUpload } from '@/features/shared/images/types';
import { fetchMyUser, updateAvatar } from '@/features/users/api';
import { getDefaultGroup, getGroups } from '@/features/groups/api';

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
  const queryClient = useQueryClient();

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

  const getAndSetGroups = useCallback(async () => {
    const groups = await getGroups();
    queryClient.setQueryData(['groups'], groups);

    let isRedirect = false;

    if (!groups.length) {
      isRedirect = true;
      router.replace('/groups/');
    }

    const defaultGroup = await getDefaultGroup();

    if (defaultGroup) {
      queryClient.setQueryData(['selectedGroup'], defaultGroup);
    }

    return isRedirect;
  }, [queryClient]);

  const signIn = useCallback(
    async (email: string, password: string) => {
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
    },
    [getAndSetGroups],
  );

  const signOut = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
      queryClient.clear();

      router.replace('/sign-in');
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }, [queryClient]);

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (!(userLogged && token)) return;

      userAndTokenUpdate(userLogged, token);
      await getAndSetGroups();
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const updateUserAvatar = useCallback(
    async (avatar: IImageUpload): Promise<void> => {
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
    },
    [],
  );

  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  const contextReturnValues = useMemo<AuthContextDataProps>(() => {
    return {
      user,
      signIn,
      signOut,
      updateUserAvatar,
      isLoadingUserStorageData,
    };
  }, [isLoadingUserStorageData, signIn, user, signOut, updateUserAvatar]);

  return (
    <AuthContext.Provider value={contextReturnValues}>
      {children}
    </AuthContext.Provider>
  );
}
