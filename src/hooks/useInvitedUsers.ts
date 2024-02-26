import { useQuery } from '@tanstack/react-query';

import { getInvitedUsers } from '@/queries/groups';

export const useInvitedUsers = (id: number) =>
  useQuery({
    queryKey: ['users-invited', id],
    queryFn: () => getInvitedUsers(id),
    initialData: null,
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar os usuários convidados.',
    },
  });
