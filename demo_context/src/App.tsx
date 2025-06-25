import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/themeContext'
import { useTheme } from './contexts/themeContext'
import { NotificationsList } from './components/NotificationsList'
import { NotificationProvider } from './contexts/notificationContext'
import { TestButtons } from './components/TestButtons'

const Enfant = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <TestButtons></TestButtons>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="light">
      <NotificationProvider>
        <div>
          <Enfant />
        </div>
        <NotificationsList />
      </NotificationProvider>
    </ThemeProvider>

  )
}

export default App
