import './App.css'
import { useAuth } from './hook/useAuth'
import { Navigate } from 'react-router-dom'
import Nav from './components/hero/Nav'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { preloadFFmpeg } from './service/FFmpegService'
import { Layout } from './router/Layout'


        
function App() {

  useEffect(() => {
    preloadFFmpeg();
  }, []);

  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return <></>
  
  return (
    <>
      { 
        isAuthenticated ? 
        <Box >
          <Nav/>       
          <main>
            <Layout/>
          </main>
        </Box>
        : 
        <Navigate to="/login" replace />
      }
    
    </>
  )
}

export default App
