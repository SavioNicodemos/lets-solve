import { IImageUpload } from '@/dtos/ComplaintDTO';
import { ICreateUser, UserDTO } from '@/dtos/UserDTO';
import { api } from '@/services/api';

export async function createUser(data: ICreateUser): Promise<void> {
  const formData = new FormData();
  formData.append('avatar', data.avatar as any);
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('tel', data.tel);
  formData.append('password', data.password);

  await api.postForm('/users', formData);
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

export async function updateAvatar(avatar: IImageUpload): Promise<void> {
  const body = new FormData();
  body.append('_method', 'PUT');
  body.append('avatar', avatar as any);

  await api.postForm('/users/avatar', body);
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
