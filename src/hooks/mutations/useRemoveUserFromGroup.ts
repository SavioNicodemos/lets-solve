import { useMutation } from '@tanstack/react-query';

import { deleteFromGroup } from '@/queries/mutations/groups';
import { useGroup } from '../useGroup';
import { useGroups } from '../useGroups';

export const useRemoveUserFromGroup = (groupId: number) => {
  const { refetch: refetchGroups } = useGroups();
  const { refetch: refetchCurrentGroup } = useGroup(groupId);
  return useMutation({
    mutationFn: (userId: string) => deleteFromGroup({ groupId, userId }),
    mutationKey: ['remove-user-from-group', groupId],
    onSuccess: () => {
      refetchGroups();
      refetchCurrentGroup();
    },
  });
};
