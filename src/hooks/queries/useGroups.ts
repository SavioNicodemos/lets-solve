import { useQuery } from '@tanstack/react-query';

import { getGroups } from '@/queries/groups';

export const useGroups = () =>
  useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups(),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus grupos',
    },
  });
