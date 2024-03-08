import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/contexts/ReactQueryContext';
import { IGroupDTO } from '@/dtos/GroupDTO';
import { getDefaultGroup } from '@/queries/groups';
import { updateDefaultGroup } from '@/queries/mutations/groups';
import { useToast } from './useToast';

export function useSelectedGroup() {
  const toast = useToast();
  const query = useQuery({
    queryKey: ['selectedGroup'],
    queryFn: () => getDefaultGroup(),
    staleTime: 1000 * 60 * 60 * 2,
    // Added this as we always have the default group set when the app starts
    initialData: {} as IGroupDTO,
  });

  const mutation = useMutation({
    mutationKey: ['setSelectGroup'],
    mutationFn: (group: IGroupDTO) => {
      if (group.id === query.data?.id) return Promise.resolve(group);

      queryClient.setQueryData(['selectedGroup'], group);

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
