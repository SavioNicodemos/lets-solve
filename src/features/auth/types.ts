import { IImageUpload } from '@/features/shared/images/types';
import { UserDTO } from '@/features/users/types';

export type UpdatePasswordParams = {
  password: string;
  passwordConfirm: string;
  token: string;
  email: string;
};

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserAvatar: (avatar: IImageUpload) => Promise<void>;
  isLoadingUserStorageData: boolean;
};
