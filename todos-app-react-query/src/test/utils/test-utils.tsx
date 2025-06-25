import React, { type ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import uiSlice from '../../store/slices/todoSlice'

// Configuration du store pour les tests
const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      ui: uiSlice
    },
    preloadedState
  })
}

// Configuration du QueryClient pour les tests
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Pas de retry en test
        gcTime: 0, // Pas de cache persistant
        staleTime: 0
      },
      mutations: {
        retry: false
      }
    }
  })
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any
  store?: ReturnType<typeof createTestStore>
  queryClient?: QueryClient
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    queryClient = createTestQueryClient(),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {children}
        </Provider>
      </QueryClientProvider>
    )
  }

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}