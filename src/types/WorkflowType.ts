import type {
    ImagePayloadSchema,
    JobAcceptedSchema,
    JobEventSchema,
    JobImagePayloadOutSchema,
} from '../schema/WorkflowSchema';
import type { z } from 'zod';

export type JobAcceptedType = z.infer<typeof JobAcceptedSchema>;
export type JobEventType = z.infer<typeof JobEventSchema>;
export type JobImagePayloadOutType = z.infer<typeof JobImagePayloadOutSchema>;
export type ImagePayloadType = z.infer<typeof ImagePayloadSchema>;
