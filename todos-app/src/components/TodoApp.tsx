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

const TodoApp: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const { items: todos, loading, error, filter } = useAppSelector(state => state.todos)
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()))
      setInputValue('')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const handleToggleTodo = (id: number): void => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (id: number): void => {
    dispatch(deleteTodo(id))
  }

  const handleSetFilter = (filterType: FilterType): void => {
    dispatch(setFilter(filterType))
  }

  const filteredTodos: Todo[] = todos.filter(todo => {
    switch (filter) {
      case 'ACTIVE':
        return !todo.completed
      case 'COMPLETED':
        return todo.completed
      default:
        return true
    }
  })

  const completedCount: number = todos.filter(todo => todo.completed).length
  const activeCount: number = todos.length - completedCount

  // Styles avec types
  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    marginRight: '5px',
    backgroundColor: isActive ? '#007bff' : '#f8f9fa',
    color: isActive ? 'white' : 'black',
    border: '1px solid #dee2e6',
    padding: '5px 10px',
    cursor: 'pointer'
  })

  const todoItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee'
  }

  const todoTextStyle = (completed: boolean): React.CSSProperties => ({
    flex: 1,
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? '#888' : 'black'
  })

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo App - Redux Toolkit TypeScript</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ajouter une tâche..."
          disabled={loading}
          style={{ width: '70%', padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" disabled={loading || !inputValue.trim()}>
          {loading ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          Erreur: {error}
        </div>
      )}
      
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={() => handleSetFilter('ALL')}
          style={buttonStyle(filter === 'ALL')}
        >
          Toutes ({todos.length})
        </button>
        <button 
          onClick={() => handleSetFilter('ACTIVE')}
          style={buttonStyle(filter === 'ACTIVE')}
        >
          Actives ({activeCount})
        </button>
        <button 
          onClick={() => handleSetFilter('COMPLETED')}
          style={buttonStyle(filter === 'COMPLETED')}
        >
          Terminées ({completedCount})
        </button>
      </div>

      {loading && todos.length === 0 ? (
        <div>Chargement des tâches...</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map((todo: Todo) => (
            <li key={todo.id} style={todoItemStyle}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={todoTextStyle(todo.completed)}>
                {todo.text}
              </span>
              <button 
                onClick={() => handleDeleteTodo(todo.id)}
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
          ))}
        </ul>
      )}
      
      {filteredTodos.length === 0 && todos.length > 0 && (
        <div>Aucune tâche dans cette catégorie</div>
      )}
    </div>
  )
}

export default TodoApp