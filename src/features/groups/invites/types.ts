import { GroupId } from '../types';

export type IInvitedUser = {
  id: number;
  email: string;
};

export type IInviteFromGroup = {
  id: number;
  name: string;
  image_url: string;
};

export type FetchInviteFromGroup = IInviteFromGroup;

export type FetchInvitedUser = IInvitedUser;

export type IInviteDTO = {
  id: number;
  group_id: number;
  email: string;
};

export type FetchCreateInvite = IInviteDTO;

export type ManageGroupInviteParams = {
  inviteId: number;
  accept: boolean;
};

export type ISendGroupInvite = {
  groupId: GroupId;
  email: string;
};

export type IDeleteGroupInvite = {
  inviteId: number;
};
