import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui, client = createTestQueryClient()) {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );

  return { client, ...render(ui, { wrapper: Wrapper }) };
}

  
