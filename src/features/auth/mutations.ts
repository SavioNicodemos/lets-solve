import { useMutation } from '@tanstack/react-query';
import { updatePassword } from './api';
import { UPDATE_PASSWORD_MUTATION_KEY } from './constants';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
    mutationKey: [UPDATE_PASSWORD_MUTATION_KEY],
  });
};
