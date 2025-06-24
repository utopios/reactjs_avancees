import { configureStore } from '@reduxjs/toolkit'

import TodoReducer from './slices/todoSlice'

const store = configureStore({
  reducer: {
    todos: TodoReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
