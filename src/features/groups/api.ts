import { api } from '@/services/api';
import {
  FetchGroupById,
  FetchMyGroups,
  GroupId,
  IGroupDTO,
  IGroupWithParticipants,
  IDeleteFromGroup,
  IUpdateGroup,
} from './types';
import { IImageUpload } from '@/features/shared/images/types';

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

export async function getDefaultGroup(): Promise<IGroupDTO> {
  const response = await api.get<IGroupDTO>(`/users/default-group`);

  return response.data;
}

export async function deleteFromGroup({
  groupId,
  userId,
}: IDeleteFromGroup): Promise<void> {
  await api.delete(`/groups/${groupId}/users/${userId}`);
}

export async function createGroup({
  name,
  image,
}: {
  name: string;
  image: IImageUpload;
}): Promise<IGroupDTO> {
  const body = new FormData();
  body.append('name', name);
  body.append('image', image as any);
  const response = await api.postForm<IGroupDTO>(`/groups`, body);

  return response.data;
}

export async function updateGroup({
  groupId,
  name,
  image,
}: IUpdateGroup): Promise<IGroupWithParticipants> {
  const body = new FormData();
  if (image) body.append('image', image as any);
  if (name) body.append('name', name);
  const response = await api.putForm<IGroupWithParticipants>(
    `/groups/${groupId}`,
    body,
  );

  return response.data;
}

export async function updateDefaultGroup(groupId: GroupId): Promise<IGroupDTO> {
  const response = await api.post<IGroupDTO>(`/users/default-group`, {
    group_id: groupId,
  });

  return response.data;
}
