import { useQuery } from '@tanstack/react-query';

import { getGroupById } from '@/queries/groups';

export const useGroup = (id: number) =>
  useQuery({
    queryKey: ['group', id],
    queryFn: () => getGroupById(id),
    initialData: null,
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar o grupo selecionado.',
    },
  });
