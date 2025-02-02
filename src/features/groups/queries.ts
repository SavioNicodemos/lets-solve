import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getDefaultGroup,
  getGroupById,
  getGroups,
  updateDefaultGroup,
} from './api';
import { GroupId, IGroupDTO } from './types';
import { useToast } from '../shared/hooks/useToast';
import {
  USE_GROUP_QUERY_KEY,
  USE_GROUPS_QUERY_KEY,
  USE_SELECTED_GROUP_QUERY_KEY,
} from './constants';

export const useGroup = (id: GroupId) =>
  useQuery({
    queryKey: [USE_GROUP_QUERY_KEY, id],
    queryFn: () => getGroupById(id),
    staleTime: 1000 * 10,
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar o grupo selecionado.',
    },
  });

export const useGroups = () =>
  useQuery({
    queryKey: [USE_GROUPS_QUERY_KEY],
    queryFn: () => getGroups(),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus grupos',
    },
  });

export function useSelectedGroup() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [USE_SELECTED_GROUP_QUERY_KEY],
    queryFn: () => getDefaultGroup(),
    staleTime: 1000 * 60 * 60 * 2,
    // Added this as we always have the default group set when the app starts
    initialData: {} as IGroupDTO,
  });

  const mutation = useMutation({
    mutationKey: ['setSelectGroup'],
    mutationFn: (group: IGroupDTO) => {
      if (group.id === query.data?.id) return Promise.resolve(group);

      queryClient.setQueryData([USE_SELECTED_GROUP_QUERY_KEY], group);

      return updateDefaultGroup(group.id);
    },
    onMutate: async group => {
      await query.refetch();
      return group;
    },
    onError: () => {
      toast.error('Ocorreu um erro ao selecionar o grupo');
      query.refetch();
    },
  });

  return { query, mutation };
}
