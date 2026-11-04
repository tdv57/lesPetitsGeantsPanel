import { z, type ZodObject } from 'zod';
import { WorkflowClient } from '../client/WorkflowClient';
import { imageValidation } from '../components/validation/ImageValidation';
import type { TypeImageEnum } from '../enum/TypeImageEnum';
import type { JobAcceptedType, JobGenerateOutType, JobImagePayloadOutType } from '../types/WorkflowType';

let workflowClient: WorkflowClient | null = null;

export function setWorkflowClient() {
    workflowClient = WorkflowClient.getInstance();
}

export function clearWorkflowClient() {
    if (workflowClient) {
        workflowClient.logout();
    }
}

export async function traitement(image: File): Promise<JobAcceptedType | null> {
    if (workflowClient) {
        return workflowClient.traitement(image);
    } else {
        console.warn('Client workflow non initialisé');
        return null;
    }
}

export async function getTraitementJob(jobId: string): Promise<JobImagePayloadOutType | null> {
    if (workflowClient) {
        return workflowClient.getTraitementJob(jobId);
    } else {
        console.warn('Client workflow non initialisé');
        return null;
    }
}

export async function generate(params: {
    prompt: string, 
    schema: object, 
    typeImage: TypeImageEnum, 
    image?: File}): Promise<JobAcceptedType | null> {
    if (workflowClient) {
        return workflowClient.generate(params);
    } else {
        console.warn('Client workflow non initialisé');
        return null;
    }
}

export async function getGenerateJob(jobId: string): Promise<JobGenerateOutType | null> {
    if (workflowClient) {
        return workflowClient.getGenerateJob(jobId);
    } else {
        console.warn('Client workflow non initialisé');
        return null;
    }
}

export function buildGenerate(values: Record<string, unknown>, ignored: string[], validationSchemaForSafeParse: ZodObject, shape: ZodObject, basePrompt: string): {schema: object, prompt: string, image?: File, toFill: string[]} {
        const result = validationSchemaForSafeParse.safeParse(values);
        const invalid = new Set<string>(
            result.success? [] : result.error.issues.map((i) => String(i.path[0]))
        )
        const isEmpty = (v: unknown) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
        const keys = Object.keys(values).filter((k) => !ignored.includes(k as never));
        const toFill  = keys.filter((k) => invalid.has(k) || isEmpty(values[k]));
        const known   = keys.filter((k) => !toFill.includes(k));

        const mask = Object.fromEntries(toFill.map((k) => [k, true])) as Record<string, true> & Record<string, never>;
        const schema: object = z.toJSONSchema(shape.pick(mask));

        const knowledge = known.map((k) => `${k}: ${values[k]}`).join("\n");
        const prompt = basePrompt + '\n' + knowledge;
        const image = values.image instanceof File && imageValidation.safeParse(values.image).success 
            ? values.image 
            : undefined;
        return {schema, prompt, image, toFill};
    }