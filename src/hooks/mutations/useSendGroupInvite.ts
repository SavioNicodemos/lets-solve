import { useMutation } from '@tanstack/react-query';

import { sendGroupInvite } from '@/queries/mutations/groups';
import { useInvitedUsers } from '../queries/useInvitedUsers';
import { GroupId } from '@/dtos/GroupDTO';

export const useSendGroupInvite = (groupId: GroupId) => {
  const { refetch } = useInvitedUsers(groupId);

  return useMutation({
    mutationFn: (email: string) => sendGroupInvite({ groupId, email }),
    mutationKey: ['send-group-invite', groupId],
    onSuccess: () => refetch(),
  });
};
