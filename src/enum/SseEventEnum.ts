export const SseEventEnumValue = {
    JOBS: 'jobs',
} as const;

export type SseEventEnum = (typeof SseEventEnumValue)[keyof typeof SseEventEnumValue];
