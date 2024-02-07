import { router } from 'expo-router';
import { useToast } from 'native-base';

type Props = {
  message?: string;
};

export function ErrorBoundary({ message }: Props) {
  const toast = useToast();
  toast.show({
    placement: 'top',
    bgColor: 'red.500',
    title: message || 'Erro ao carregar essa página, tente novamente!',
  });

  router.back();

  return null;
}
