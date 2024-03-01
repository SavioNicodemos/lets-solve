import { useMutation } from '@tanstack/react-query';

import { deleteGroupInvite } from '@/queries/mutations/groups';
import { useInvitedUsers } from '../useInvitedUsers';

export const useDeleteGroupInvite = (groupId: number) => {
  const { refetch } = useInvitedUsers(groupId);

  return useMutation({
    mutationFn: (inviteId: number) => deleteGroupInvite({ groupId, inviteId }),
    mutationKey: ['delete-group-invite', groupId],
    onSuccess: () => refetch(),
  });
};
