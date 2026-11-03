import { WorkflowClient } from '../client/WorkflowClient';
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