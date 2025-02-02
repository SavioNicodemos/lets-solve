import { useMutation } from '@tanstack/react-query';
import { submitEvaluation } from './api';
import { ISubmitEvaluation } from './types';

export function useSubmitEvaluation(complaintId: string) {
  return useMutation({
    mutationFn: (items: ISubmitEvaluation) =>
      submitEvaluation({ complaintId, ...items }),
  });
}
