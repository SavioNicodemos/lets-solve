import { IImageUpload } from '@/dtos/ComplaintDTO';
import { IGroupDTO, IGroupWithParticipants } from '@/dtos/GroupDTO';
import { FetchCreateInvite, IInviteDTO } from '@/dtos/GroupInviteDTO';
import { api } from '@/services/api';

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

export async function acceptGroupInvite(inviteId: number): Promise<void> {
  await api.patch(`/invites/${inviteId}/accept`);
}

export async function declineGroupInvite(inviteId: number): Promise<void> {
  await api.patch(`/invites/${inviteId}/decline`);
}

type IUpdateGroup = {
  groupId: number;
  name?: string;
  image?: IImageUpload;
};

type IDeleteFromGroup = {
  groupId: number;
  userId: string;
};

type ISendGroupInvite = {
  groupId: number;
  email: string;
};

type IDeleteGroupInvite = {
  groupId: number;
  inviteId: number;
};
