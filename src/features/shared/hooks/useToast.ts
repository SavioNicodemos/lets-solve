import { useToast as useToastLib } from 'native-base';

export function useToast() {
  const toast = useToastLib();

  const success = (message: string) => {
    toast.show({
      title: message,
      placement: 'top',
      bgColor: 'green.500',
    });
  };

  const error = (message: string) => {
    toast.show({
      title: message,
      placement: 'top',
      bgColor: 'red.500',
    });
  };

  const info = (message: string) => {
    toast.show({
      title: message,
      placement: 'top',
      bgColor: 'blue.500',
    });
  };

  return { success, info, error };
}
