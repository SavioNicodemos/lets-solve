import { IImageUpload } from './ComplaintDTO';

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  tel: string;
  avatar_url: string;
};

export type ICreateUser = {
  avatar: IImageUpload;
  name: string;
  email: string;
  tel: string;
  password: string;
  confirm_password: string;
};

export type PublicUserDTO = Pick<UserDTO, 'id' | 'name' | 'avatar_url'>;
