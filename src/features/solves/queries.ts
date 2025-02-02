import { useQuery } from '@tanstack/react-query';

import { getComplaint, getMySolves, getSolves } from './api';
import { IFiltersDTO } from '@/features/shared/dtos/FiltersDTO';
import { useSelectedGroup } from '@/features/groups/queries';
import { MyComplaintsStatusEnum } from './types';
import {
  USE_MY_SOLVES_QUERY_KEY,
  USE_SOLVE_QUERY_KEY,
  USE_SOLVES_QUERY_KEY,
} from './constants';

export const useSolve = (complaintId: string | undefined) =>
  useQuery({
    queryKey: [USE_SOLVE_QUERY_KEY, complaintId],
    queryFn: () => getComplaint(complaintId as string),
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar o Resolve',
    },
    enabled: !!complaintId,
  });

export function useMySolves(state?: MyComplaintsStatusEnum) {
  const {
    query: { data: group },
  } = useSelectedGroup();

  const groupId = group.id;

  return useQuery({
    queryKey: [USE_MY_SOLVES_QUERY_KEY, groupId, state],
    queryFn: () => getMySolves({ groupId, state }),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus Resolves',
    },
  });
}

export function useSolves(filters: IFiltersDTO) {
  const {
    query: { data: group },
  } = useSelectedGroup();

  const groupId = group.id;

  return useQuery({
    queryKey: [USE_SOLVES_QUERY_KEY, filters, groupId],
    queryFn: () => getSolves(filters, groupId),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar os Resolves',
    },
  });
}
