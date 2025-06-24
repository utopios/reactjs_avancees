import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Todo, TodoState, FilterType, ApiTodo } from '../../types/todo'

const initialState: TodoState = {
    items: [],
    loading: false,
    error: null,
    filter: 'ALL'
}

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            if (!response.ok) {
                throw new Error('Failed to fetch todos')
            }
            const data: ApiTodo[] = await response.json()
            return data.map(todo => ({
                id: todo.id,
                text: todo.title,
                completed: todo.completed
            }))
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            return rejectWithValue(message)
        }
    }
)

export const addTodo = createAsyncThunk<
    Todo,    // Type de retour
    string,  // Type des arguments (text)
    { rejectValue: string }
>(
    'todos/addTodo',
    async (text, { rejectWithValue }) => {
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
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la tâche')
            }
            const todo: ApiTodo = await response.json()
            return {
                id: Date.now(), // Simulation d'un ID unique
                text: todo.title,
                completed: todo.completed
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erreur inconnue'
            return rejectWithValue(message)
        }
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.items.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(todo => todo.id !== action.payload)
        },
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Fetch todos from API
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
            state.loading = false
            state.items = action.payload
        }).addCase(fetchTodos.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.loading = false
            state.error = action.payload || 'Failed to fetch todos'
        }).addCase(addTodo.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.loading = false
            state.items.push(action.payload)
        }).addCase(addTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload ?? 'Erreur lors de l\'ajout'
        })
    }
})

export const { toggleTodo, deleteTodo, setFilter, clearError } = todoSlice.actions

export default todoSlice.reducer
