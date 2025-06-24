import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnWindowFocus: true,
        retry: 3,
        retryDelay: 1000,
        gcTime: 1000 * 60 * 15, 
        staleTime: 1000 * 60 * 5,
        refetchOnReconnect: true, 
        },
        mutations: {
        retry: 1,
        },
    },
})