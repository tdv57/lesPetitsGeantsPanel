import { type TypeImageEnum } from '../enum/TypeImageEnum';
import { mapFileToImagePayload } from '../mapper/ImageMapper';
import {
    JobAcceptedSchema,
    JobGenerateOutSchema,
    JobImagePayloadOutSchema,
} from '../schema/WorkflowSchema';
import { supabase } from '../service/SupabaseService';
import type {
    JobAcceptedType,
    JobGenerateOutType,
    JobImagePayloadOutType,
} from '../types/WorkflowType';

export class WorkflowClient {
    private static instance: WorkflowClient | null = null;

    private constructor() {}

    public static getInstance() {
        return (WorkflowClient.instance ??= new WorkflowClient());
    }

    private static readonly EXPIRY_MARGIN_MS = 60_000;

    private token: string | null = null;
    private expiresAt = 0;
    private loginPromise: Promise<void> | null = null;

    private isTokenValid(): boolean {
        return this.token != null && Date.now() < this.expiresAt - WorkflowClient.EXPIRY_MARGIN_MS;
    }

    public async getToken(): Promise<string> {
        if(!this.isTokenValid()){
            this.loginPromise = this.login().finally(() => {
                this.loginPromise = null;
            })
            await this.loginPromise;
        }
        return this.token!;
    }
    
    private async login(): Promise<void> {
        const {
            data: { user }
        } = await supabase.auth.getUser();
        const password = user?.app_metadata.workflow_password;
        if (!password) throw new Error("Workflow password absent");
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: password}),
        });
        if (!res.ok) throw new Error(`Echec de l'authentification au workflow`);
        const { jwt } = await res.json();
        if(!jwt) throw new Error(`Echec de l'authentification au workflow le jwt est absent`);
        this.token = jwt;
        this.expiresAt = WorkflowClient.readExp(jwt);
    }

    public logout(): void {
        this.token = null;
        this.expiresAt = 0;
    }

    private static readExp(jwt: string): number {
        const base64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64)).exp * 1000;
    }

    public static BACK_URL = '/api';

    private async request(path: string, init: RequestInit = {}, retry=true): Promise<Response> {
        const token = await this.getToken();
        const res = await fetch(`${WorkflowClient.BACK_URL}${path}`, {
            ...init,
            headers: { ...init.headers, Authorization: `Bearer ${token}` },
        });
        if (res.status === 401 && retry) {
            this.logout();
            return this.request(path, init, false);
        }
        return res;
    }

    public async traitement(image: File): Promise<JobAcceptedType | null> {
        const body = new FormData();
        body.append('image', image);
        const response = await this.request('/images/traitement', {
            method: 'POST',
            body,
        });
        if (!response.ok) {
            console.warn('Traitement échoué');
            return null;
        }
        const parsed = JobAcceptedSchema.safeParse(await response.json());
        if (!parsed.success) {
            console.warn('Traitement réponse invalide');
            return null;
        }
        return parsed.data;
    }

    public async getTraitementJob(jobId: string): Promise<JobImagePayloadOutType | null> {
        const response = await this.request(`/images/traitement/job/${jobId}`);
        if (!response.ok) {
            console.warn('Traitement job échoué');
            return null;
        }
        const parsed = JobImagePayloadOutSchema.safeParse(await response.json());
        if (!parsed.success) {
            console.warn('Traitement job réponse invalide');
            return null;
        }
        return parsed.data;
    }

    public async generate(params: {
        prompt: string;
        schema: object;
        typeImage: TypeImageEnum;
        image?: File;
    }): Promise<JobAcceptedType | null> {
        const body = {
            prompt: params.prompt,
            json_schema: JSON.stringify(params.schema),
            type_image: params.typeImage,
            image: params.image ? mapFileToImagePayload(params.image) : null,
        };
        const headers = { 'Content-Type': 'application/json' };
        const response = await this.request('/images/generate', {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            console.warn('Generate échoué');
            return null;
        }
        const parsed = JobAcceptedSchema.safeParse(await response.json());
        if (!parsed.success) {
            console.warn('Generate réponse invalide');
            return null;
        }
        return parsed.data;
    }

    public async getGenerateJob(jobId: string): Promise<JobGenerateOutType | null> {
        const response = await this.request(`/images/generate/job/${jobId}`);
        if (!response.ok) {
            console.warn('Generate job échoué');
            return null;
        }
        const parsed = JobGenerateOutSchema.safeParse(await response.json());
        if (!parsed.success) {
            console.warn('Generate job réponse invalide');
            return null;
        }
        return parsed.data;
    }
}
