import { useMutation } from '@tanstack/react-query';

import { ISubmitEvaluation } from '@/dtos/ComplaintDTO';
import { submitEvaluation } from '@/queries/mutations/solves';

export function useSubmitEvaluation(complaintId: string) {
  return useMutation({
    mutationFn: (items: ISubmitEvaluation) =>
      submitEvaluation({ complaintId, ...items }),
  });
}
