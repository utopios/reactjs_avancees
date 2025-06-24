import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Temps de cache des données (5 minutes)
      staleTime: 5 * 60 * 1000,
      // Temps avant garbage collection (10 minutes)
      gcTime: 10 * 60 * 1000,
      // Retry automatique en cas d'erreur
      retry: 3,
      // Refetch automatique au focus
      refetchOnWindowFocus: true,
      // Refetch automatique à la reconnexion
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry pour les mutations
      retry: 1,
    },
  },
})