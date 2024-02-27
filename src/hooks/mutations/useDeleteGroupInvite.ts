import { useMutation } from '@tanstack/react-query';

import { deleteGroupInvite } from '@/queries/mutations/groups';

export const useDeleteGroupInvite = (groupId: number) => {
  return useMutation({
    mutationFn: (inviteId: number) => deleteGroupInvite({ groupId, inviteId }),
    mutationKey: ['delete-group-invite', groupId],
  });
};
