import { useMutation } from '@tanstack/react-query';

import { sendGroupInvite } from '@/queries/mutations/groups';

export const useSendGroupInvite = (groupId: number) => {
  return useMutation({
    mutationFn: (email: string) => sendGroupInvite({ groupId, email }),
    mutationKey: ['send-group-invite', groupId],
  });
};
