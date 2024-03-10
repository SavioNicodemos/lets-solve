import { useQuery } from '@tanstack/react-query';

import { MyComplaintsStatusEnum } from '@/dtos/ComplaintDTO';
import { getMySolves } from '@/queries/solves';
import { useSelectedGroup } from './useSelectedGroup';

export function useMySolves(state?: MyComplaintsStatusEnum) {
  const {
    query: { data: group },
  } = useSelectedGroup();

  const groupId = group.id;

  return useQuery({
    queryKey: ['mySolves', groupId, state],
    queryFn: () => getMySolves({ groupId, state }),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus Resolves',
    },
  });
}
