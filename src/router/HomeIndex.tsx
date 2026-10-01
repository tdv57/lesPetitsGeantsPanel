import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";


export function HomeIndex() {
    const {isAuthenticated} = useAuth();
    return <Navigate to={isAuthenticated ? "/videos-du-moment" : "/login"} replace/>
}