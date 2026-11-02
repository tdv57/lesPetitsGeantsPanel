import { JobAcceptedSchema, JobImagePayloadOutSchema } from "../schema/WorkflowSchema";
import type { JobAcceptedType, JobImagePayloadOutType } from "../types/WorkflowType";

export class WorkflowClient {
    private static instance: WorkflowClient | null = null;

    private constructor() {}    

    public static getInstance() {
        return (WorkflowClient.instance ??= new WorkflowClient());
    }

    public logout() {
    }

    public static BACK_URL = "/api"

    private async request(path: string, init = {}): Promise<Response>{
        const res = await fetch(`${WorkflowClient.BACK_URL}${path}`, {
            ...init
        })
        return res;
    }

    public async traitement(image: File): Promise<JobAcceptedType | null> {
        const body = new FormData()
        body.append("image", image)
        const response = await this.request("/images/traitement", {
            method: "POST",
            body
        });
        if (!response.ok) {
            console.warn("Traitement échoué");
            return null;
        }
        const parsed = JobAcceptedSchema.safeParse(await response.json())
        if (!parsed.success) {
            console.warn("Traitement réponse invalide")
            return null;
        }
        return parsed.data;
    }

    public async getTraitementJob(jobId: string): Promise<JobImagePayloadOutType | null> {
        const response = await this.request(`/images/traitement/job/${jobId}`);
        if (!response.ok) {
            console.warn("Traitement job échoué");
            return null;
        }
        const parsed = JobImagePayloadOutSchema.safeParse(await response.json());
        if (!parsed.success) {
            console.warn("Traitement job réponse invalide");
            return null;
        }
        return parsed.data;
    }
}