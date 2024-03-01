import { PublicUserDTO } from './UserDTO';

export type IGroupDTO = {
  id: number;
  name: string;
  image_url: string;
  is_admin: boolean;
  participants_count: number;
};

export type IGroupWithParticipants = IGroupDTO & {
  participants: PublicUserDTO[];
};

export type IInvitedUser = {
  id: number;
  email: string;
};

export type FetchInvitedUser = IInvitedUser;

export type FetchGroupById = IGroupWithParticipants;

export type FetchMyGroups = IGroupDTO[];
