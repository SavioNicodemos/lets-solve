import { useMutation } from '@tanstack/react-query';

import { updatePassword } from '@/queries/auth';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
    mutationKey: ['update-password'],
  });
};
