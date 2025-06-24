export interface Todo {
  id: number
  text: string
  completed: boolean
}

export type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETED'

export interface TodoState {
  items: Todo[]
  loading: boolean
  error: string | null
  filter: FilterType
}

export interface ApiTodo {
  id: number
  title: string
  completed: boolean
  userId: number
}