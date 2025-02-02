import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from './api';
import { USE_INFINITE_COMMENTS_QUERY_KEY } from './constants';

export const useInfiniteComments = (complaintId: string | undefined) =>
  useInfiniteQuery({
    queryKey: [USE_INFINITE_COMMENTS_QUERY_KEY, complaintId],
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
