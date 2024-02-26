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

export async function leaveGroup({ groupId }: ILeaveGroup): Promise<void> {
  // await api.delete(`/groups/${groupId}/leave`);
  console.log(`Left group ${groupId}`);
}

type ILeaveGroup = {
  groupId: number;
};

type ISendGroupInvite = {
  groupId: number;
  email: string;
};

type IDeleteGroupInvite = {
  groupId: number;
  inviteId: number;
};
