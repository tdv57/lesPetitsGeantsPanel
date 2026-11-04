import type { JobEventType } from '../types/WorkflowType';
import { useAppSelector } from '../redux/hooks';
import { JobStatusEnumValue } from '../enum/JobStatusEnum';

type useJobsEventsReturnType = {
    jobEvent: JobEventType | null;
    isSending: boolean;
    isRunning: boolean;
    isDone: boolean;
    isLocked: boolean
}
export function useJobsEvents(jobId: string | null): useJobsEventsReturnType {
    const event = useAppSelector((s) => (jobId ? (s.jobs.events[jobId] ?? null) : null));

    const isDone =
        event?.status === JobStatusEnumValue.COMPLETE ||
        event?.status === JobStatusEnumValue.FAILED;
    const isSending = !!jobId && !event;
    const isRunning = !!event && !isDone;
    const isLocked = isSending || isRunning;

    return { jobEvent:event, isSending, isRunning, isDone, isLocked };
}
