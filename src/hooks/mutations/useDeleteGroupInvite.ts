import { useMutation } from '@tanstack/react-query';

import { useInvitedUsers } from '@/hooks/queries/useInvitedUsers';
import { deleteGroupInvite } from '@/queries/mutations/groups';
import { GroupId } from '@/dtos/GroupDTO';

export const useDeleteGroupInvite = (groupId: GroupId) => {
  const { refetch } = useInvitedUsers(groupId);

  return useMutation({
    mutationFn: (inviteId: number) => deleteGroupInvite({ inviteId }),
    mutationKey: ['delete-group-invite', groupId],
    onSuccess: () => refetch(),
  });
};
