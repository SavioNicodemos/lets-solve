import { useMutation } from '@tanstack/react-query';
import { addComment } from './api';
import { USE_ADD_COMMENT_MUTATION_KEY } from './constants';

export default function useAddComment(complaintId: string) {
  return useMutation({
    mutationFn: (message: string) =>
      addComment({ complaintId, message: message.trim() }),
    mutationKey: [USE_ADD_COMMENT_MUTATION_KEY, complaintId],
  });
}
