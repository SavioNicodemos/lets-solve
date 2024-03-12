import { useMutation } from '@tanstack/react-query';

import { ICreateUser } from '@/dtos/UserDTO';
import { createUser } from '@/queries/mutations/auth';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: ICreateUser) => createUser(data),
    mutationKey: ['create-user'],
  });
};
