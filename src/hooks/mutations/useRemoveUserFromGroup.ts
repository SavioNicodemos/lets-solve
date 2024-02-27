import { useMutation } from '@tanstack/react-query';

import { deleteFromGroup } from '@/queries/mutations/groups';

export const useRemoveUserFromGroup = (groupId: number) => {
  return useMutation({
    mutationFn: (userId: string) => deleteFromGroup({ groupId, userId }),
    mutationKey: ['remove-user-from-group', groupId],
  });
};
