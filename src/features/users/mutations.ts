import { useMutation } from '@tanstack/react-query';
import { createUser } from './api';
import { ICreateUser } from './types';
import { CREATE_USER_MUTATION_KEY } from './constants';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: ICreateUser) => createUser(data),
    mutationKey: [CREATE_USER_MUTATION_KEY],
  });
};
