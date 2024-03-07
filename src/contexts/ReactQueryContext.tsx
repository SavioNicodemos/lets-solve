import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import { AppError } from '@/utils/AppError';
import { handleError } from '@/utils/handleError';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_, query) => {
      if (!query.meta?.errorMessage) return;
      handleError(new AppError(query.meta.errorMessage as string));
    },
  }),
});

export function ReactQueryContext({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
