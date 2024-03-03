import { useQuery } from '@tanstack/react-query';

import { getGroupInvites } from '@/queries/groups';

export const useGroupInvites = () => {
  return useQuery({
    queryKey: ['group-invites'],
    queryFn: () => getGroupInvites(),
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus convites.',
    },
  });
};
