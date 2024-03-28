import { useQuery } from '@tanstack/react-query';

import { verifyToken } from '@/queries/auth';

export const useValidatePasswordToken = (email: string, token: string) => {
  return useQuery({
    queryFn: () => verifyToken({ email, token }),
    queryKey: ['verify-password-token'],
    retry: 0,
    meta: {
      errorMessage: 'Ocorreu ao validar token',
    },
  });
};
