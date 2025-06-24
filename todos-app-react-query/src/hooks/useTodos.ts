import { useQuery, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../services/todoApi';
import type { Todo } from '../types/todo';

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const
}

export const useFetchTodos = () => {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: todoApi.fetchTodos
  });
}