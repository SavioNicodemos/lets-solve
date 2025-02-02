import { useMutation } from '@tanstack/react-query';
import { GroupId } from '../types';
import {
  acceptGroupInvite,
  declineGroupInvite,
  deleteGroupInvite,
  sendGroupInvite,
} from './api';
import { useGroupInvites, useInvitedUsers } from './queries';
import { useGroups } from '../queries';
import { ManageGroupInviteParams } from './types';
import {
  DELETE_GROUP_INVITE_MUTATION_KEY,
  MANAGE_GROUP_INVITE_MUTATION_KEY,
  SEND_GROUP_INVITE_MUTATION_KEY,
} from './constants';

export const useManageGroupInvite = () => {
  const { refetch: refetchInvites } = useGroupInvites();
  const { refetch: refetchGroups } = useGroups();

  return useMutation({
    mutationFn: async ({ accept, inviteId }: ManageGroupInviteParams) => {
      if (accept) {
        return acceptGroupInvite(inviteId);
      }
      return declineGroupInvite(inviteId);
    },
    mutationKey: [MANAGE_GROUP_INVITE_MUTATION_KEY],
    onSuccess: () => {
      refetchInvites();
      refetchGroups();
    },
  });
};

export const useSendGroupInvite = (groupId: GroupId) => {
  const { refetch } = useInvitedUsers(groupId);

  return useMutation({
    mutationFn: (email: string) => sendGroupInvite({ groupId, email }),
    mutationKey: [SEND_GROUP_INVITE_MUTATION_KEY, groupId],
    onSuccess: () => refetch(),
  });
};

export const useDeleteGroupInvite = (groupId: GroupId) => {
  const { refetch } = useInvitedUsers(groupId);

  return useMutation({
    mutationFn: (inviteId: number) => deleteGroupInvite({ inviteId }),
    mutationKey: [DELETE_GROUP_INVITE_MUTATION_KEY, groupId],
    onSuccess: () => refetch(),
  });
};
