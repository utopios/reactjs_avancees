import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { todoApi } from '../services/todoApi';
import type { Todo } from '../types/todo';

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const
}



export const useFetchTodos = () => {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: todoApi.fetchTodos
  });
}


export const useAddTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: (newTodo) => {
    console.log('Nouvelle tâche ajoutée:', newTodo)
      // Mise à jour optimiste du cache
      queryClient.setQueryData<Todo[]>(todoKeys.lists(), (oldTodos = []) => {
        return [...oldTodos, newTodo]
      })
      
      // Alternative : invalider le cache pour refetch
      //queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    },
    onError: (error) => {
      console.error('Erreur lors de l\'ajout:', error)
      // Optionnel : afficher une notification d'erreur
    }
  })
}

