import { useEffect, useState } from "react";
import { supabase } from "../service/SupabaseService";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session)
            setLoading(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session)
        })

        return () => listener.subscription.unsubscribe()
    },[])

    return {isAuthenticated, loading};
}