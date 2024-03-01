import {
  FetchGroupById,
  FetchInvitedUser,
  FetchMyGroups,
  IGroupDTO,
  IGroupWithParticipants,
  IInvitedUser,
} from '@/dtos/GroupDTO';
import { api } from '@/services/api';

export const getGroups = async (): Promise<IGroupDTO[]> => {
  const response = await api.get<FetchMyGroups>(`/groups`);

  return response.data;
};

export const getGroupById = async (
  id: number,
): Promise<IGroupWithParticipants> => {
  const response = await api.get<FetchGroupById>(`/groups/${id}`);

  return response.data;
};

export const getInvitedUsers = async (id: number): Promise<IInvitedUser[]> => {
  const response = await api.get<FetchInvitedUser[]>(`/groups/${id}/invites`);

  return response.data;
};
