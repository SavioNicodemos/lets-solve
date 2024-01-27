import { IImageUpload } from './ProductDTO';

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  tel: string;
  avatar: string;
};

export type ICreateUser = {
  avatar: IImageUpload;
  name: string;
  email: string;
  tel: string;
  password: string;
  confirm_password: string;
};
