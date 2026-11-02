import { z } from 'zod';
import { JobStatusEnumValue } from '../enum/JobStatusEnum';

export const JobAcceptedSchema = z.object({
    job_id: z.string(),
});

const JobOutSchema = <T extends z.ZodTypeAny>(result: T) => {
    return z.object({
        job_id: z.string(),
        status: z.enum(JobStatusEnumValue),
        result: result.nullable(),
        error_code: z.string().nullable(),
        error_message: z.string().nullable(),
    });
};

export const JobEventSchema = z.object({
    job_id: z.string(),
    status: z.enum(JobStatusEnumValue),
});

export const ImagePayloadSchema = z.object({
    data: z.string(),
    mime_type: z.string(),
});

export const JobImagePayloadOutSchema = JobOutSchema(ImagePayloadSchema);
