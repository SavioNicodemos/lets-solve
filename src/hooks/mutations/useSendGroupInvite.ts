import { useMutation } from '@tanstack/react-query';

import { sendGroupInvite } from '@/queries/mutations/groups';
import { useInvitedUsers } from '../useInvitedUsers';

export const useSendGroupInvite = (groupId: number) => {
  const { refetch } = useInvitedUsers(groupId);

  return useMutation({
    mutationFn: (email: string) => sendGroupInvite({ groupId, email }),
    mutationKey: ['send-group-invite', groupId],
    onSuccess: () => refetch(),
  });
};
