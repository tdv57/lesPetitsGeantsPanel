import { supabase } from "../service/SupabaseService";
import type { D1AnnonceInsert, AnnonceSelect, D1AnnonceUpdate } from "../types/AnnonceType";

export class AnnonceClient {
    private static instance: AnnonceClient | null = null;

    private constructor() {}

    public static getInstance(): AnnonceClient {
        return (AnnonceClient.instance ??= new AnnonceClient());
    }

    public static readonly D1_ANNONCE_URL = 'https://les-petits-geants-annonce-worker.ferdinand-axia.workers.dev';
    private static readonly EXPIRY_MARGIN_MS = 60_000;

    private token : string | null = null;
    private expiresAt = 0;
    private loginPromise: Promise<void> | null = null;

    private isTokenValid(): boolean {
        return (
            this.token !== null &&
            Date.now() < this.expiresAt - AnnonceClient.EXPIRY_MARGIN_MS
        );
    }

    public async getToken(): Promise<string> {
        if (this.isTokenValid()) return this.token!;

        this.loginPromise ??= this.login().finally(() => {
            this.loginPromise = null;
        });

        await this.loginPromise;
        return this.token!;
    } 

    private async login(): Promise<void> {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const d1AnnonceCred = user?.app_metadata.d1_annonce_access_key;
        const res = await fetch(`${AnnonceClient.D1_ANNONCE_URL}/annonces/login`, {
            method: 'POST',
            headers: {Authorization: `Bearer ${d1AnnonceCred}`}
        });
        if (!res.ok) console.error(`Login échoué ${res.status}`);

        const { token } = await res.json();
        if (!token) console.error(`Token de login absent de la réponse`);
        this.token = token;
        this.expiresAt = AnnonceClient.readExp(token);
    }

    private static readExp(jwt: string): number {
        const base64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload.exp * 1000;
    }

    public logout(): void {
        this.token = null;
        this.expiresAt = 0;
    }

    private async request(path: string, init: RequestInit = {}): Promise<Response> {
        await this.getToken();
        const res = await fetch(`${AnnonceClient.D1_ANNONCE_URL}${path}`, {
            ...init,
            headers: {...init.headers, Authorization: `Bearer ${this.token}`}
        });
        return res;
    }

    public async findAllAnnonce(): Promise<AnnonceSelect[]> {
        const res = await this.request('/annonces', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!res.ok) {
            console.warn(`findAllAnnonces a raté ${res.status}`);
            return [];
        }
        return res.json();
    }

    public async getAnnonceById(id: number): Promise<AnnonceSelect | null> {
        const res = await this.request(`/annonces/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!res.ok) {
            console.warn(`findAllAnnonces a raté ${res.status}`);
            return null;
        }
        return res.json();
    }

    public async createAnnonce(annonce: D1AnnonceInsert): Promise<AnnonceSelect | null> {
        const res = await this.request('/annonces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(annonce),
        });
        if (!res.ok) {
            console.warn(`createAnnonce a raté ${res.status}`);
            return null;
        }
        return res.json();
    }

    public async updateAnnonce(annonce: D1AnnonceUpdate, id: number): Promise<AnnonceSelect | null> {
        const res = await this.request(`/annonces/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(annonce),
        });
        if (!res.ok) {
            console.warn(`updateAnnonce a raté ${res.status}`);
            return null 
        }
        return res.json();
    }

    public async deleteAnnonce(id: number): Promise<boolean> {
        const res = await this.request(`/annonces/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            },
        });
        if (!res.ok) {
            console.warn(`deleteAnnonce a raté ${res.status}`);
            return false;
        }
        return true;
    }
}