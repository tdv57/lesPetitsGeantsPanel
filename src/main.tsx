import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.tsx';
import { system } from './theme/theme.ts';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { COLORS } from './theme/Couleur.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider value={system}>
                <Box minH="100vh" bg={COLORS.background}>
                    <RouterProvider router={router} />
                </Box>
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
