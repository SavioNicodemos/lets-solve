import { Redirect, router } from 'expo-router';

import { useToast } from '@/hooks/useToast';

type Props = {
  message?: string;
};

export function ErrorBoundary({ message }: Props) {
  const toast = useToast();
  toast.error(message || 'Erro ao carregar essa página, tente novamente!');

  if (router.canGoBack()) {
    return <Redirect href=".." />;
  }

  return <Redirect href="/" />;
}
