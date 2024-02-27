import { PublicUserDTO } from './UserDTO';

export type IGroupDTO = {
  id: number;
  name: string;
  image_url: string;
  is_admin: boolean;
  participants_count: number;
};

export type FetchGroupById = IGroupDTO & {
  participants: PublicUserDTO[];
};

export type FetchInvitedUser = {
  id: number;
  email: string;
};
