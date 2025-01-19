import { useMutation } from '@tanstack/react-query';

import { useGroup } from '@/hooks/queries/useGroup';
import { useGroups } from '@/hooks/queries/useGroups';
import { deleteFromGroup } from '@/queries/mutations/groups';
import { GroupId } from '@/dtos/GroupDTO';

export const useRemoveUserFromGroup = (groupId: GroupId) => {
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
