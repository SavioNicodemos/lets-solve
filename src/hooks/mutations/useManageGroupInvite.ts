import { useMutation } from '@tanstack/react-query';

import {
  acceptGroupInvite,
  declineGroupInvite,
} from '@/queries/mutations/groups';
import { useGroupInvites } from '../useGroupInvites';
import { useGroups } from '../useGroups';

export const useManageGroupInvite = () => {
  const { refetch: refetchInvites } = useGroupInvites();
  const { refetch: refetchGroups } = useGroups();

  return useMutation({
    mutationFn: async ({ accept, inviteId }: Params) => {
      if (accept) {
        return acceptGroupInvite(inviteId);
      }
      return declineGroupInvite(inviteId);
    },
    mutationKey: ['manage-group-invite'],
    onSuccess: () => {
      refetchInvites();
      refetchGroups();
    },
  });
};

type Params = {
  inviteId: number;
  accept: boolean;
};
