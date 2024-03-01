import { useMutation } from '@tanstack/react-query';

import { deleteFromGroup } from '@/queries/mutations/groups';
import { useGroups } from '../useGroups';

export const useRemoveUserFromGroup = (groupId: number) => {
  const { refetch } = useGroups();
  return useMutation({
    mutationFn: (userId: string) => deleteFromGroup({ groupId, userId }),
    mutationKey: ['remove-user-from-group', groupId],
    onSuccess: () => refetch(),
  });
};
