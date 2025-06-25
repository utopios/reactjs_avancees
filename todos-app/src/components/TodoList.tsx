import React, { memo, useMemo } from 'react'
import { useAppSelector } from '../hooks/redux'
import {TodoItem} from './TodoItem'
import type { Todo } from '../types/todo'

interface TodoListProps {}

export const TodoList: React.FC<TodoListProps> = memo(() => {
  console.log('🔄 TodoList rendered')
  
  const { items: todos, loading, filter } = useAppSelector(state => state.todos)

  const filteredTodos = useMemo((): Todo[] => {
    console.log('🧮 Filtering todos...')
    return todos.filter(todo => {
      switch (filter) {
        case 'ACTIVE':
          return !todo.completed
        case 'COMPLETED':
          return todo.completed
        default:
          return true
      }
    })
  }, [todos, filter])

  if (loading && todos.length === 0) {
    return <div>Chargement des tâches...</div>
  }

  if (filteredTodos.length === 0 && todos.length > 0) {
    return <div>Aucune tâche dans cette catégorie</div>
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {filteredTodos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
})