import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/themeContext'
import { useTheme } from './contexts/themeContext'
import { NotificationsList } from './components/NotificationsList'
import { NotificationProvider } from './contexts/notificationContext'
import { TestButtons } from './components/TestButtons'
import { DisplayModal } from './components/DisplayModal'
import { ErrorBoundary } from "react-error-boundary"
const WithError = () => {

  throw new Error('This is a simulated error from WithError component')
  
  
}


const Enfant = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <TestButtons></TestButtons>
      <DisplayModal></DisplayModal>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
  const [showError, setShowError] = useState(false)
  return (
    <ThemeProvider defaultTheme="light">
      <NotificationProvider>
        <button onClick={()=> setShow(!show)}>Show</button>
        <button onClick={()=> setShowError(!showError)}>Show Error</button>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          {showError && <WithError />}
          {show && (
            <div>
              <h2>Je suis une modale</h2>
              <button onClick={() => setShow(false)}>Close</button> 
            </div>
          )}
        </ErrorBoundary>
        <div>
          <Enfant />
        </div>
        <NotificationsList />
      </NotificationProvider>
    </ThemeProvider>

  )
}

export default App
