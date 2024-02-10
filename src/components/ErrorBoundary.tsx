import { router } from 'expo-router';

import { useToast } from '@/hooks/useToast';

type Props = {
  message?: string;
};

export function ErrorBoundary({ message }: Props) {
  const toast = useToast();
  toast.error(message || 'Erro ao carregar essa página, tente novamente!');

  router.back();

  return null;
}
