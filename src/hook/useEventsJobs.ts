import { useEffect, useState } from "react";
import { eventsJobs } from "../client/SseClient";
import type { JobEventType } from "../schema/WorkflowSchema";

export function useJobEvent(jobId: string | null): JobEventType | null {
  const [event, setEvent] = useState<JobEventType | null>(null);

  useEffect(() => {
    if (!jobId) return;
    setEvent(null);

    return eventsJobs.subscribe((e) => {
      if (e.job_id === jobId) setEvent(e);
    });
  }, [jobId]);

  return event;
}