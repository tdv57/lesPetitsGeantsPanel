import App from '../App';
import Erreur404 from '../components/hero/404';
import Login from '../components/hero/Login';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Images from '../components/hero/Images';
import { HomeIndex } from './HomeIndex';

export const router = createBrowserRouter([
    {
        index: true,
        element: <HomeIndex />,
    },
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate to="videos-du-moment" replace /> },

            {
                path: 'videos-du-moment',
                element: null,
            },
            {
                path: 'article-de-la-saison',
                element: null,
            },
            {
                path: 'images',
                element: <Images />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Erreur404 />,
    },
]);
