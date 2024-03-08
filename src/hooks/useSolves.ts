import { useQuery } from '@tanstack/react-query';

import { IFiltersDTO } from '@/dtos/FiltersDTO';
import { getSolves } from '@/queries/solves';
import { useSelectedGroup } from './useSelectedGroup';

export function useSolves(filters: IFiltersDTO) {
  const {
    query: { data: group },
  } = useSelectedGroup();

  const groupId = group.id;

  return useQuery({
    queryKey: ['solves', filters, groupId],
    queryFn: () => getSolves(filters, groupId),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar os Resolves',
    },
  });
}
