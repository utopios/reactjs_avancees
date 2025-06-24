# TP Formation Redux Toolkit - Refonte d'une Application Todo

## Objectif du TP
Refactoriser une application Todo existante utilisant Redux classique vers Redux Toolkit. Cette migration vous permettra de comprendre concrètement les avantages et les différences entre les deux approches.



### Étape 1 : Installation et setup initial (15 minutes)

```bash
# Si vous partez de zéro
npm install @reduxjs/toolkit react-redux

# Si vous migrez (Redux classique peut coexister)
npm install @reduxjs/toolkit
```

### Étape 2 : Création du store RTK (20 minutes)

**Consignes :**
1. Créez un nouveau fichier `src/store/store.js`
2. Remplacez l'ancien store par `configureStore`
3. Configurez le DevTools et le middleware par défaut



### Étape 3 : Conversion en slice 

**Consignes :**
1. Créez `src/store/todoSlice.js`
2. Convertissez les actions synchrones avec `createSlice`
3. Convertissez les actions asynchrones avec `createAsyncThunk`
4. Comparez le nombre de lignes avec l'ancien code

**Points à implémenter :**
- `fetchTodos` (action asynchrone)
- `addTodo` (action asynchrone) 
- `toggleTodo` (action synchrone)
- `deleteTodo` (action synchrone)
- `setFilter` (action synchrone)



### Étape 4 : Mise à jour du composant

**Consignes :**
1. Mettez à jour les imports dans `TodoApp.js`
2. Remplacez les anciennes actions par les nouvelles
3. Testez que tout fonctionne

### Code 

```js
// === ACTIONS TYPES ===
// src/actions/actionTypes.js
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const SET_FILTER = 'SET_FILTER'
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE'
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE'

// === ACTION CREATORS ===
// src/actions/todoActions.js
import * as types from './actionTypes'

// Actions synchrones
export const addTodoSuccess = (todo) => ({
  type: types.ADD_TODO_SUCCESS,
  payload: todo
})

export const toggleTodo = (id) => ({
  type: types.TOGGLE_TODO,
  payload: id
})

export const deleteTodo = (id) => ({
  type: types.DELETE_TODO,
  payload: id
})

export const setFilter = (filter) => ({
  type: types.SET_FILTER,
  payload: filter
})

// Actions asynchrones avec Redux-Thunk
export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_TODOS_REQUEST })
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      const todos = await response.json()
      dispatch({
        type: types.FETCH_TODOS_SUCCESS,
        payload: todos.map(todo => ({
          id: todo.id,
          text: todo.title,
          completed: todo.completed
        }))
      })
    } catch (error) {
      dispatch({
        type: types.FETCH_TODOS_FAILURE,
        payload: error.message
      })
    }
  }
}

export const addTodo = (text) => {
  return async (dispatch) => {
    dispatch({ type: types.ADD_TODO_REQUEST })
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: text,
          completed: false,
          userId: 1
        })
      })
      const todo = await response.json()
      dispatch(addTodoSuccess({
        id: Date.now(), // Simulation d'un ID unique
        text: todo.title,
        completed: todo.completed
      }))
    } catch (error) {
      dispatch({
        type: types.ADD_TODO_FAILURE,
        payload: error.message
      })
    }
  }
}

// === REDUCERS ===
// src/reducers/todoReducer.js
import * as types from '../actions/actionTypes'

const initialState = {
  items: [],
  loading: false,
  error: null,
  filter: 'ALL' // ALL, ACTIVE, COMPLETED
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TODOS_REQUEST:
    case types.ADD_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    
    case types.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    
    case types.ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload]
      }
    
    case types.FETCH_TODOS_FAILURE:
    case types.ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    case types.TOGGLE_TODO:
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    
    case types.DELETE_TODO:
      return {
        ...state,
        items: state.items.filter(todo => todo.id !== action.payload)
      }
    
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      }
    
    default:
      return state
  }
}

export default todoReducer

// === STORE ===
// src/store/index.js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import todoReducer from '../reducers/todoReducer'

const rootReducer = combineReducers({
  todos: todoReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store

// === COMPOSANT PRINCIPAL ===
// src/components/TodoApp.js
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, addTodo, toggleTodo, deleteTodo, setFilter } from '../actions/todoActions'

const TodoApp = () => {
  const [inputValue, setInputValue] = useState('')
  const { items: todos, loading, error, filter } = useSelector(state => state.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()))
      setInputValue('')
    }
  }

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'ACTIVE':
        return !todo.completed
      case 'COMPLETED':
        return todo.completed
      default:
        return true
    }
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo App - Redux Classique</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une tâche..."
          disabled={loading}
          style={{ width: '70%', padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" disabled={loading || !inputValue.trim()}>
          {loading ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>

      {error && <div style={{ color: 'red', margin: '10px 0' }}>Erreur: {error}</div>}
      
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={() => dispatch(setFilter('ALL'))}
          style={{ 
            marginRight: '5px', 
            backgroundColor: filter === 'ALL' ? '#007bff' : '#f8f9fa',
            color: filter === 'ALL' ? 'white' : 'black',
            border: '1px solid #dee2e6',
            padding: '5px 10px'
          }}
        >
          Toutes ({todos.length})
        </button>
        <button 
          onClick={() => dispatch(setFilter('ACTIVE'))}
          style={{ 
            marginRight: '5px', 
            backgroundColor: filter === 'ACTIVE' ? '#007bff' : '#f8f9fa',
            color: filter === 'ACTIVE' ? 'white' : 'black',
            border: '1px solid #dee2e6',
            padding: '5px 10px'
          }}
        >
          Actives ({activeCount})
        </button>
        <button 
          onClick={() => dispatch(setFilter('COMPLETED'))}
          style={{ 
            backgroundColor: filter === 'COMPLETED' ? '#007bff' : '#f8f9fa',
            color: filter === 'COMPLETED' ? 'white' : 'black',
            border: '1px solid #dee2e6',
            padding: '5px 10px'
          }}
        >
          Terminées ({completedCount})
        </button>
      </div>

      {loading && todos.length === 0 ? (
        <div>Chargement des tâches...</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(todo => (
            <li key={todo.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '10px', 
              borderBottom: '1px solid #eee' 
            }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                style={{ marginRight: '10px' }}
              />
              <span 
                style={{ 
                  flex: 1, 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : 'black'
                }}
              >
                {todo.text}
              </span>
              <button 
                onClick={() => dispatch(deleteTodo(todo.id))}
                style={{ 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px' 
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
```