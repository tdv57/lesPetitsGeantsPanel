import type {
    ImagePayloadSchema,
    JobAcceptedSchema,
    JobEventSchema,
    JobImagePayloadOutSchema,
    GenerateOutSchema,
    GenerateInSchema,
    JobGenerateOutSchema,
} from '../schema/WorkflowSchema';
import type { z } from 'zod';

export type JobAcceptedType = z.infer<typeof JobAcceptedSchema>;
export type JobEventType = z.infer<typeof JobEventSchema>;
export type JobImagePayloadOutType = z.infer<typeof JobImagePayloadOutSchema>;
export type ImagePayloadType = z.infer<typeof ImagePayloadSchema>;
export type GenerateOutType = z.infer<typeof GenerateOutSchema>;
export type GenerateInType = z.infer<typeof GenerateInSchema>;
export type JobGenerateOutType = z.infer<typeof JobGenerateOutSchema>;
