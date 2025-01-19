import {
  FetchGroupById,
  FetchInviteFromGroup,
  FetchInvitedUser,
  FetchMyGroups,
  GroupId,
  IGroupDTO,
  IGroupWithParticipants,
  IInviteFromGroup,
  IInvitedUser,
} from '@/dtos/GroupDTO';
import { api } from '@/services/api';

export const getGroups = async (): Promise<IGroupDTO[]> => {
  const response = await api.get<FetchMyGroups>(`/groups`);

  return response.data;
};

export const getGroupById = async (
  id: GroupId,
): Promise<IGroupWithParticipants> => {
  const response = await api.get<FetchGroupById>(`/groups/${id}`);

  return response.data;
};

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

export async function getDefaultGroup(): Promise<IGroupDTO> {
  const response = await api.get<IGroupDTO>(`/users/default-group`);

  return response.data;
}
