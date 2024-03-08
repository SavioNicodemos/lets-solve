import { useQuery } from '@tanstack/react-query';

import { getMySolves } from '@/queries/solves';
import { useSelectedGroup } from './useSelectedGroup';

export function useMySolves() {
  const {
    query: { data: group },
  } = useSelectedGroup();

  const groupId = group.id;

  return useQuery({
    queryKey: ['mySolves', groupId],
    queryFn: () => getMySolves(groupId),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus Resolves',
    },
  });
}
