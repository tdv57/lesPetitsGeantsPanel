export const JobStatusEnumValue = {
    QUEUED: 'queued',
    DEFERRED: 'deferred',
    IN_PROGRESS: 'in_progress',
    COMPLETE: 'complete',
    FAILED: 'failed',
} as const;

export type JobStatusEnum = (typeof JobStatusEnumValue)[keyof typeof JobStatusEnumValue];
