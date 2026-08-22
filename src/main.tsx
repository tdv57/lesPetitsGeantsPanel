import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'
import { system } from './theme/theme.ts'
import { VideosDuMomentProvider } from './components/context/VideosDuMoment.tsx'
import { ArticleDeLaSaisonProvider } from './components/context/ArticleDeLaSaison.tsx'
import { ImageProvider } from './components/context/Image.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <VideosDuMomentProvider>
        <ImageProvider>
          <ArticleDeLaSaisonProvider>
            <ChakraProvider value={system}>
                  <RouterProvider router={router} />
            </ChakraProvider>
          </ArticleDeLaSaisonProvider>
        </ImageProvider>
      </VideosDuMomentProvider>
  </StrictMode>,
)
