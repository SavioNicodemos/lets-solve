import { useQuery } from '@tanstack/react-query';

import { getGroupById } from '@/queries/groups';
import { GroupId } from '@/dtos/GroupDTO';

export const useGroup = (id: GroupId) =>
  useQuery({
    queryKey: ['group', id],
    queryFn: () => getGroupById(id),
    staleTime: 1000 * 10,
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar o grupo selecionado.',
    },
  });
