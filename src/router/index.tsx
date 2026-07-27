import App from "../App";
import Erreur404 from "../components/hero/404";
import ArticleDeLaSaison from "../components/hero/ArticleDeLaSaison";
import Login from "../components/hero/Login";
import VideosDuMoment from "../components/hero/VideosDuMoment";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from '../hook/useAuth'

function HomeIndex() {
    const {isAuthenticated} = useAuth();
    return <Navigate to={isAuthenticated ? "/videos-du-moment" : "/login"} replace/>
}
export const router = createBrowserRouter([
    {
    index: true,                              // "/" exactement
    element: <HomeIndex />, // redirige toujours vers /login
    },
    {
        path:"/",
        element: <App/>,
        children: [
            { index: true, element: <Navigate to="videos-du-moment" replace /> },
            
            {
                path: "videos-du-moment", 
                element:<VideosDuMoment/>
            },
            {
                path:"article-de-la-saison",
                element: <ArticleDeLaSaison/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: "*",
        element: <Erreur404/>
    }
]);