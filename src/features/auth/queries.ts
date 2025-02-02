import { useQuery } from '@tanstack/react-query';
import { verifyToken } from './api';
import { USE_VERIFY_USER_TOKEN_QUERY_KEY } from './constants';

export const useValidatePasswordToken = (email: string, token: string) => {
  return useQuery({
    queryFn: () => verifyToken({ email, token }),
    queryKey: [USE_VERIFY_USER_TOKEN_QUERY_KEY],
    retry: 0,
    meta: {
      errorMessage: 'Ocorreu ao validar token',
    },
  });
};
