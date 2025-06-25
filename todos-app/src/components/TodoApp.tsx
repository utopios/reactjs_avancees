import React, { useEffect, useState, type FormEvent, type ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { 
  fetchTodos, 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  setFilter,
  clearError
} from '../store/slices/todoSlice'
import type { FilterType, Todo } from '../types/todo'
import { TodoInput } from './TodoInput'
import { FilterButtons } from './FilterButtons'
import { TodoList } from './TodoList'

const TodoApp: React.FC = () => {
  const { error } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  // Nettoyage de l'erreur après 5 secondes
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        dispatch(clearError())
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [error, dispatch])

  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo App - Redux Toolkit TypeScript</h1>
      
      <TodoInput/>

      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          Erreur: {error}
        </div>
      )}
      
      <FilterButtons></FilterButtons>

      <TodoList></TodoList>
    </div>
  )
}

export default TodoApp