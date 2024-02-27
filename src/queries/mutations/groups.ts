import { IImageUpload } from '@/dtos/ComplaintDTO';

export async function deleteGroupInvite({
  groupId,
  inviteId,
}: IDeleteGroupInvite): Promise<void> {
  // await api.delete(`/groups/${groupId}/invites/${inviteId}`);
  console.log(`Deleted invite ${inviteId} from group ${groupId}`);
}

export async function sendGroupInvite({
  groupId,
  email,
}: ISendGroupInvite): Promise<void> {
  // await api.post(`/groups/${groupId}/invites`, { email });
  console.log(`Sent invite to email ${email} for group ${groupId}`);
}

export async function deleteFromGroup({
  groupId,
  userId,
}: IDeleteFromGroup): Promise<void> {
  // await api.delete(`/groups/${groupId}/users/${userId}`);
  console.log(`Deleted user ${userId} from group ${groupId}`);
}

export async function updateGroup({
  groupId,
  name,
  image,
}: IUpdateGroup): Promise<void> {
  // const body = new FormData();
  // if (image) body.append('image', image as any);
  // if (name) body.append('name', name);
  // await api.putForm(`/groups/${groupId}`, body);
  console.log(
    `Updated group ${groupId} with name ${name} and with${!image || 'out'} image`,
  );
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
