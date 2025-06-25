import React, { useState, useCallback, memo, type FormEvent, type ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { addTodo } from '../store/slices/todoSlice'

interface TodoInputProps { }

export const TodoInput: React.FC<TodoInputProps> = memo(() => {

    const [inputValue, setInputValue] = useState<string>('')
    const { loading } = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch()

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (inputValue.trim()) {
            dispatch(addTodo(inputValue.trim()))
            setInputValue('')
        }
    }, [inputValue, dispatch])

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }, [])

    return (
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
    )
}
)