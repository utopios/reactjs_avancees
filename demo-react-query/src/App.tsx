import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UsersList } from './components/usersList'
import PageDemo  from './components/InfinityPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <UsersList></UsersList>
    <PageDemo></PageDemo>
  )
}

export default App
