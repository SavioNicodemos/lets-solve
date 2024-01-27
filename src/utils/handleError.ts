import { Toast } from 'native-base';
import { AppError } from './AppError';

export const handleError = (error: unknown) => {
  const isAppError = error instanceof AppError;

  const title = isAppError
    ? error.message
    : 'Não foi possível entrar. Tente novamente mais tarde.';

  Toast.show({
    title,
    placement: 'top',
    bgColor: 'red.500',
  });
};
