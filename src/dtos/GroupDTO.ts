import { PublicUserDTO } from './UserDTO';

export type FetchGroups = {
  id: number;
  name: string;
  image_url: string;
  users_count: number;
};

export type FetchGroupById = FetchGroups & {
  is_admin: boolean;
  users: PublicUserDTO[];
};

export type FetchInvitedUser = {
  id: number;
  email: string;
};

export type IGroupDTO = FetchGroups;
