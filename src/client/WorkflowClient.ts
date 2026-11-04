import { type TypeImageEnum } from '../enum/TypeImageEnum';
import { mapFileToImagePayload } from '../mapper/ImageMapper';
import { JobAcceptedSchema, JobGenerateOutSchema, JobImagePayloadOutSchema } from '../schema/WorkflowSchema';
import type { JobAcceptedType, JobGenerateOutType, JobImagePayloadOutType } from '../types/WorkflowType';

export class WorkflowClient {
    private static instance: WorkflowClient | null = null;

    private constructor() {}

    public static getInstance() {
        return (WorkflowClient.instance ??= new WorkflowClient());
    }

    public logout() {}

    public static BACK_URL = '/api';

    private async request(path: string, init = {}): Promise<Response> {
        const res = await fetch(`${WorkflowClient.BACK_URL}${path}`, {
            ...init,
        });
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
        prompt: string,
        schema: object,
        typeImage: TypeImageEnum,
        image?: File
    }): Promise<JobAcceptedType | null> {
        const body = {
            prompt: params.prompt, 
            json_schema: JSON.stringify(params.schema),
            type_image: params.typeImage,
            image: params.image ? mapFileToImagePayload(params.image) : null
        }
        const headers = { 'Content-Type': 'application/json' };
        const response = await this.request('/images/generate', {method: 'POST', headers, body: JSON.stringify(body)});
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
