import { JobEventSchema, type JobEventType } from "../schema/WorkflowSchema";
import { fetchEventSource } from "@microsoft/fetch-event-source"

const STREAM_JOB_URL = "/api/events/jobs";

class EventsJobs{
    private ctrl: AbortController | null = null;
    private listeners = new Set<(job: JobEventType) => void>();

    subscribe(listener: (job: JobEventType) => void) {
        this.listeners.add(listener)
        this.open()

        return () => {
            this.listeners.delete(listener);
            if (this.listeners.size === 0) this.close();
        }
    }   

    private open() {
        if (this.ctrl) return 
        this.ctrl = new AbortController();

        fetchEventSource(STREAM_JOB_URL, {
            signal: this.ctrl.signal,
            openWhenHidden: true, 
            onmessage: (msg) => {
                if (msg.event !== "jobs") return; 
                try {
                    const parse = JobEventSchema.safeParse(JSON.parse(msg.data));
                    if (!parse.success) {
                        console.error("SseClient jobs error: ", parse.error);
                        return
                    }
                    this.listeners.forEach((listener) => listener(parse.data));
                } catch {
                    console.error("Parsing error");
                    return
                }
            },
            onerror: (err) => {
                console.error(`Sse error: ${err}`);
            }
        });
    }

    private close() {
        this.ctrl?.abort();
        this.ctrl = null;
    } 
}

export const eventsJobs = new EventsJobs();