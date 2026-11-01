import { WorkflowClient } from "../client/WorkflowClient";
import type { JobAcceptedType } from "../schema/WorkflowSchema";

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