import { JobEventSchema } from '../schema/WorkflowSchema';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import type { JobEventType } from '../types/WorkflowType';
import { WorkflowClient } from './WorkflowClient';

const STREAM_JOB_URL = '/api/events/jobs';

class EventsJobs {
    private ctrl: AbortController | null = null;
    private listeners = new Set<(job: JobEventType) => void>();

    subscribe(listener: (job: JobEventType) => void) {
        this.listeners.add(listener);
        this.open();

        return () => {
            this.listeners.delete(listener);
            if (this.listeners.size === 0) this.close();
        };
    }

    private async open() {
        if (this.ctrl) return;
        const ctrl = (this.ctrl = new AbortController());
        const client = WorkflowClient.getInstance();
        let token :string;
        try {
            token = await client.getToken();
        } catch (e) {
            console.error('Sse login error', e);
            if (this.ctrl === ctrl) this.ctrl = null;
            return;
        }
        if (ctrl.signal.aborted) return;
        fetchEventSource(STREAM_JOB_URL, {
            signal: ctrl.signal,
            openWhenHidden: true,
            headers: { Authorization: `Bearer ${token}` },
            async onopen(res) {
                if (res.ok && res.headers.get('content-type')?.startsWith('text/event-stream')) return;
                if (res.status === 401) client.logout();
                throw new Error(`SSE ${res.status}`);
            },
            onmessage: (msg) => {
                if (msg.event !== 'jobs') return;
                try {
                    const parse = JobEventSchema.safeParse(JSON.parse(msg.data));
                    if (!parse.success) {
                        console.error('SseClient jobs error: ', parse.error);
                        return;
                    }
                    this.listeners.forEach((listener) => listener(parse.data));
                } catch {
                    console.error('Parsing error');
                    return;
                }
            },
            onerror: (err) => {
                console.error(`Sse error: ${err}`);
            },
        });
    }

    private close() {
        this.ctrl?.abort();
        this.ctrl = null;
    }
}

export const eventsJobs = new EventsJobs();
