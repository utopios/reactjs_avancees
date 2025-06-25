import React, { useCallback, memo } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { toggleTodo, deleteTodo } from '../store/slices/todoSlice'
import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
}

export const TodoItem: React.FC<TodoItemProps> = memo(({ todo }) => {
  console.log(`🔄 TodoItem rendered for todo ${todo.id}`)
  
  const dispatch = useAppDispatch()

  const handleToggle = useCallback((): void => {
    dispatch(toggleTodo(todo.id))
  }, [dispatch, todo.id])

  const handleDelete = useCallback((): void => {
    dispatch(deleteTodo(todo.id))
  }, [dispatch, todo.id])

  const todoItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee'
  }

  const todoTextStyle: React.CSSProperties = {
    flex: 1,
    textDecoration: todo.completed ? 'line-through' : 'none',
    color: todo.completed ? '#888' : 'black'
  }

  return (
    <li style={todoItemStyle}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        style={{ marginRight: '10px' }}
      />
      <span style={todoTextStyle}>
        {todo.text}
      </span>
      <button 
        onClick={handleDelete}
        style={{ 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none', 
          padding: '5px 10px',
          cursor: 'pointer'
        }}
      >
        Supprimer
      </button>
    </li>
  )
})