import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider, type UseQueryResult } from '@tanstack/react-query'
import { useFetchTodos, useAddTodo, useToggleTodo, useDeleteTodo } from './useTodos'
import { server } from '../test/mocks/server'
import { http, HttpResponse } from 'msw'
import type { Todo } from '../types/todo'
import {renderWithProviders} from '../test/utils/test-utils'


describe('useFetchTodos', () => {
  it('devrait charger les todos avec succès', async () => {
    const { result } = renderWithProviders(() => useFetchTodos())

    // État initial
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Attendre la résolution
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toHaveLength(3)
    expect(result.current.data?.[0]).toEqual({
      id: 1,
      text: 'Test todo 1',
      completed: false
    })
  })

  it('devrait gérer les erreurs de chargement', async () => {
    // Mock d'une erreur serveur
    server.use(
      http.get('https://jsonplaceholder.typicode.com/todos', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    const { result } = renderHook(() => useFetchTodos(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeTruthy()
  })
})

describe('useAddTodo', () => {
  it('devrait ajouter un todo avec succès', async () => {
    const { result } = renderHook(() => useAddTodo(), {
      wrapper: createWrapper()
    })

    expect(result.current.isPending).toBe(false)

    // Déclencher la mutation
    result.current.mutate('Nouveau todo')

    expect(result.current.isPending).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(
      expect.objectContaining({
        text: 'Nouveau todo',
        completed: false
      })
    )
  })

  it('devrait gérer les erreurs d\'ajout', async () => {
    // Mock d'une erreur serveur
    server.use(
      http.post('https://jsonplaceholder.typicode.com/todos', () => {
        return new HttpResponse(null, { status: 400 })
      })
    )

    const { result } = renderHook(() => useAddTodo(), {
      wrapper: createWrapper()
    })

    result.current.mutate('Todo qui va échouer')

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeTruthy()
  })
})

describe('useToggleTodo', () => {
  it('devrait basculer l\'état d\'un todo', async () => {
    const { result } = renderHook(() => useToggleTodo(), {
      wrapper: createWrapper()
    })

    const todoToToggle = {
      id: 1,
      text: 'Test todo',
      completed: false
    }

    result.current.mutate(todoToToggle)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
  })

  it('devrait effectuer un rollback en cas d\'erreur', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: 0 },
        mutations: { retry: false }
      }
    })

    // Pré-remplir le cache
    const initialTodos = [
      { id: 1, text: 'Test todo', completed: false }
    ]
    queryClient.setQueryData(['todos', 'list'], initialTodos)

    // Mock d'une erreur
    server.use(
      http.patch('https://jsonplaceholder.typicode.com/todos/1', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )

    const { result } = renderHook(() => useToggleTodo(), { wrapper })

    const todoToToggle = initialTodos[0]
    result.current.mutate(todoToToggle)

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    // Vérifier que le rollback a eu lieu
    const cachedTodos = queryClient.getQueryData(['todos', 'list'])
    expect(cachedTodos).toEqual(initialTodos)
  })
})

describe('useDeleteTodo', () => {
  it('devrait supprimer un todo avec optimistic update', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: 0 },
        mutations: { retry: false }
      }
    })

    // Pré-remplir le cache
    const initialTodos = [
      { id: 1, text: 'Todo à supprimer', completed: false },
      { id: 2, text: 'Todo à garder', completed: true }
    ]
    queryClient.setQueryData(['todos', 'list'], initialTodos)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )

    const { result } = renderHook(() => useDeleteTodo(), { wrapper })

    result.current.mutate(1)

    // Vérifier la mise à jour optimiste immédiate
    const todosAfterOptimistic = queryClient.getQueryData(['todos', 'list']) as any[]
    expect(todosAfterOptimistic).toHaveLength(1)
    expect(todosAfterOptimistic[0].id).toBe(2)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
  })
})

function renderWithProviders(arg0: () => UseQueryResult<Todo[], Error>, arg1: { wrapper: any }): { result: any } {
    throw new Error('Function not implemented.')
}


describe('useAddTodo', () => {
  it('devrait ajouter un todo avec succès', async () => {
    const { result } = renderHook(() => useAddTodo(), {
      wrapper: createWrapper()
    })

    expect(result.current.isPending).toBe(false)

    // Déclencher la mutation
    result.current.mutate('Nouveau todo')

    expect(result.current.isPending).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(
      expect.objectContaining({
        text: 'Nouveau todo',
        completed: false
      })
    )
  })

  it('devrait gérer les erreurs d\'ajout', async () => {
    // Mock d'une erreur serveur
    server.use(
      http.post('https://jsonplaceholder.typicode.com/todos', () => {
        return new HttpResponse(null, { status: 400 })
      })
    )

    const { result } = renderHook(() => useAddTodo(), {
      wrapper: createWrapper()
    })

    result.current.mutate('Todo qui va échouer')

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeTruthy()
  })
})