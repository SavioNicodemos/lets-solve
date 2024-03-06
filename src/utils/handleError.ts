import { Toast } from '@gluestack-ui/themed-native-base';
import { AppError } from './AppError';

export const handleError = (error: unknown, message: string = '') => {
  const isAppError = error instanceof AppError;

  let title = 'Não foi possível concluir a operação, tente novamente.';
  if (isAppError) title = error.message;
  if (message) title = message;

  Toast.show({
    title,
    placement: 'top',
    bgColor: 'red.500',
  });
};
