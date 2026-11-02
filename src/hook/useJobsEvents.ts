import type { JobEventType } from "../types/WorkflowType";
import { useAppSelector } from "../redux/hooks";

export function useJobsEvents(jobId: string | null): JobEventType | null {
  return useAppSelector((s) => jobId ? s.jobs.events[jobId] ?? null : null);
}