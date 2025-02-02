import { api } from '@/services/api';
import {
  FetchCreateInvite,
  FetchInvitedUser,
  FetchInviteFromGroup,
  IDeleteGroupInvite,
  IInviteDTO,
  IInvitedUser,
  IInviteFromGroup,
  ISendGroupInvite,
} from './types';
import { GroupId } from '../types';

export const getInvitedUsers = async (id: GroupId): Promise<IInvitedUser[]> => {
  const response = await api.get<FetchInvitedUser[]>(`/groups/${id}/invites`);

  return response.data;
};

export async function getGroupInvites(): Promise<IInviteFromGroup[]> {
  const response = await api.get<FetchInviteFromGroup[]>(
    `/users/groups/invites`,
  );

  return response.data;
}

export async function deleteGroupInvite({
  inviteId,
}: IDeleteGroupInvite): Promise<void> {
  await api.delete(`/invites/${inviteId}`);
}

export async function sendGroupInvite({
  groupId,
  email,
}: ISendGroupInvite): Promise<IInviteDTO> {
  const response = await api.post<FetchCreateInvite>(
    `/groups/${groupId}/invites`,
    { email },
  );

  return response.data;
}

export async function acceptGroupInvite(inviteId: number): Promise<void> {
  await api.patch(`/invites/${inviteId}/accept`);
}

export async function declineGroupInvite(inviteId: number): Promise<void> {
  await api.patch(`/invites/${inviteId}/decline`);
}
