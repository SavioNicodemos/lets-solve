import { useMutation } from '@tanstack/react-query';

import { useInvitedUsers } from '@/hooks/queries/useInvitedUsers';
import { deleteGroupInvite } from '@/queries/mutations/groups';

export const useDeleteGroupInvite = (groupId: number) => {
  const { refetch } = useInvitedUsers(groupId);

  return useMutation({
    mutationFn: (inviteId: number) => deleteGroupInvite({ groupId, inviteId }),
    mutationKey: ['delete-group-invite', groupId],
    onSuccess: () => refetch(),
  });
};
