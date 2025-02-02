import { api } from '@/services/api';
import { ICreateUser, UserDTO } from './types';
import { IImageUpload } from '../shared/images/types';

export async function createUser(data: ICreateUser): Promise<void> {
  const formData = new FormData();
  formData.append('avatar', data.avatar as any);
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);

  await api.postForm('/users', formData);
}

export async function updateAvatar(avatar: IImageUpload): Promise<void> {
  const body = new FormData();
  body.append('_method', 'PUT');
  body.append('avatar', avatar as any);

  await api.postForm('/users/avatar', body);
}

export async function fetchMyUser(): Promise<UserDTO> {
  const response = await api.get<UserDTO>('/users/me');
  return response.data;
}
