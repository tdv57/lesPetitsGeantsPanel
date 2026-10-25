import { useEffect, useState } from 'react';
import { supabase } from '../service/SupabaseService';
import { setR2Client, clearR2Client } from '../service/R2Service';
import { clearAnnonceClient, setAnnonceClient } from '../service/AnnonceService';
export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setIsAuthenticated(!!session);
            if (session) {
                await setR2Client();
                setAnnonceClient();
            } else {
                clearR2Client();
                clearAnnonceClient();
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
