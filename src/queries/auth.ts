import { UserDTO } from '@/dtos/UserDTO';
import { api } from '@/services/api';

export async function fetchMyUser(): Promise<UserDTO> {
  const response = await api.get<UserDTO>('/users/me');
  return response.data;
}

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

export type UpdatePasswordParams = {
  password: string;
  passwordConfirm: string;
  token: string;
  email: string;
};
