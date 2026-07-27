import './App.css'
import { useAuth } from './hook/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import Nav from './components/hero/Nav'
import { Box } from '@chakra-ui/react'

        
function App() {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <></>
  return (
    <>
      { 
        isAuthenticated ? 
        <Box bg="bg.canvas" color="fg.default" minW="100vw" minH="100vh" >
          <Nav/>       
          <main>
            <Outlet />
          </main>
        </Box>
        : 
        <Navigate to="/login" replace />
      }
    
    </>
  )
}

export default App
