import { useMutation } from '@tanstack/react-query';

import { addComment } from '@/queries/mutations/solves';

export default function useAddComment(complaintId: string) {
  return useMutation({
    mutationFn: (message: string) =>
      addComment({ complaintId, message: message.trim() }),
    mutationKey: ['comments', complaintId],
  });
}
