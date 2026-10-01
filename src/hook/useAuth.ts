import { useEffect, useState } from 'react';
import { supabase } from '../service/SupabaseService';
import { setR2Client, clearR2Client } from '../service/R2Service';
export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setIsAuthenticated(!!session);
            if (session) {
                await setR2Client();
            } else {
                clearR2Client();
            }
            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return { isAuthenticated, loading };
}
