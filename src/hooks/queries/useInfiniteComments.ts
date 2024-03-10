import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments } from '@/queries/solves';

export const useInfiniteComments = (complaintId: string | undefined) =>
  useInfiniteQuery({
    queryKey: ['comments', complaintId],
    queryFn: ({ pageParam }) => {
      return getComments({ complaintId: complaintId!, page: pageParam });
    },
    getNextPageParam: lastData =>
      lastData.last_page > lastData.current_page
        ? lastData.current_page + 1
        : undefined,
    enabled: !!complaintId,
    initialPageParam: 1,
  });
