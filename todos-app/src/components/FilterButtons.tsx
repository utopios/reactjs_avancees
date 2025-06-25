import React, { useCallback, memo, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setFilter } from '../store/slices/todoSlice'
import type { FilterType } from '../types/todo'

interface FilterButtonsProps {}

export const FilterButtons: React.FC<FilterButtonsProps> = memo(() => {
  console.log('🔄 FilterButtons rendered')
  
  const { items: todos, filter } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  const handleSetFilter = useCallback((filterType: FilterType): void => {
    dispatch(setFilter(filterType))
  }, [dispatch])

  const { completedCount, activeCount } = useMemo(() => {
    const completed = todos.filter(todo => todo.completed).length
    return {
      completedCount: completed,
      activeCount: todos.length - completed
    }
  }, [todos])

  const buttonStyle = useCallback((isActive: boolean): React.CSSProperties => ({
    marginRight: '5px',
    backgroundColor: isActive ? '#007bff' : '#f8f9fa',
    color: isActive ? 'white' : 'black',
    border: '1px solid #dee2e6',
    padding: '5px 10px',
    cursor: 'pointer'
  }), [])

  return (
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
  )
})