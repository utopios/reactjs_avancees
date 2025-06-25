import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import type { Todo } from '../../types/todo'

const mockTodos: Todo[] = [
  { id: 1, text: 'Test todo 1', completed: false },
  { id: 2, text: 'Test todo 2', completed: true },
  { id: 3, text: 'Test todo 3', completed: false },
]

export const handlers = [
  // GET /todos
  http.get('https://jsonplaceholder.typicode.com/todos', () => {
    return HttpResponse.json(
      mockTodos.map(todo => ({
        id: todo.id,
        title: todo.text,
        completed: todo.completed,
        userId: 1
      }))
    )
  }),

  // POST /todos
  http.post('https://jsonplaceholder.typicode.com/todos', async ({ request }) => {
    const newTodo = await request.json() as any
    return HttpResponse.json({
      id: Math.random() * 1000,
      title: newTodo.title,
      completed: newTodo.completed,
      userId: newTodo.userId
    })
  }),

  // PATCH /todos/:id
  http.patch('https://jsonplaceholder.typicode.com/todos/:id', async ({ params, request }) => {
    const id = parseInt(params.id as string)
    const updates = await request.json() as any
    const todo = mockTodos.find(t => t.id === id)
    
    if (!todo) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json({
      id,
      title: todo.text,
      completed: updates.completed ?? todo.completed,
      userId: 1
    })
  }),

  // DELETE /todos/:id
  http.delete('https://jsonplaceholder.typicode.com/todos/:id', ({ params }) => {
    const id = parseInt(params.id as string)
    const todoIndex = mockTodos.findIndex(t => t.id === id)
    
    if (todoIndex === -1) {
      return new HttpResponse(null, { status: 404 })
    }

    return new HttpResponse(null, { status: 200 })
  }),
]

export const server = setupServer(...handlers)