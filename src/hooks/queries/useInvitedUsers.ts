import { useQuery } from '@tanstack/react-query';

import { getInvitedUsers } from '@/queries/groups';
import { GroupId } from '@/dtos/GroupDTO';

export const useInvitedUsers = (id: GroupId) =>
  useQuery({
    queryKey: ['users-invited', id],
    queryFn: () => getInvitedUsers(id),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar os usuários convidados.',
    },
  });
