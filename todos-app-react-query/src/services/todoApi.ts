import type { Todo, ApiTodo } from '../types/todo'

interface CreateTodoRequest {
  title: string
  completed: boolean
  userId: number
}
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export const todoApi = {
    fetchTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE_URL}/todos?_limit=10`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des tâches')
    }
    const todos: ApiTodo[] = await response.json()
    return todos.map(todo => ({
      id: todo.id,
      text: todo.title,
      completed: todo.completed
    }))
  },
  createTodo: async (text: string): Promise<Todo> => {
    const todoData: CreateTodoRequest = {
      title: text,
      completed: false,
      userId: 1
    }

    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData)
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la tâche')
    }

    const todo: ApiTodo = await response.json()
    return {
      id: Date.now(), // Simulation d'un ID unique car l'API ne retourne pas d'ID réel
      text: todo.title,
      completed: todo.completed
    }
  },
}