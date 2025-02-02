import { api } from '@/services/api';
import { UserDTO } from '@/features/users/types';
import { UpdatePasswordParams } from './types';

export async function verifyToken({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  return api.post('/password/validate-token', { email, token });
}

export async function requestPasswordReset({
  email,
}: {
  email: string;
}): Promise<boolean> {
  return api.post('/password/forgot', { email });
}

export async function updatePassword({
  password,
  passwordConfirm,
  token,
  email,
}: UpdatePasswordParams): Promise<boolean> {
  return api.put('/password/reset', {
    email,
    token,
    password,
    password_confirmation: passwordConfirm,
  });
}

export async function createSession({
  email,
  password,
}: ICreateSession): Promise<IUserAndToken> {
  const { data } = await api.post<IUserAndToken>('/sessions', {
    email,
    password,
  });

  return data;
}

type ICreateSession = {
  email: string;
  password: string;
};

type IUserAndToken = {
  user: UserDTO;
  token: string;
  refresh_token: string;
};
