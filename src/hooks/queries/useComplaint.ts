import { useQuery } from '@tanstack/react-query';

import { getComplaint } from '@/queries/solves';

export const useComplaint = (complaintId: string | undefined) =>
  useQuery({
    queryKey: ['complaint', complaintId],
    queryFn: () => getComplaint(complaintId as string),
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar o Resolve',
    },
    enabled: !!complaintId,
  });
