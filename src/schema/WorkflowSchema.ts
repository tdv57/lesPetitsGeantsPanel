import { z } from "zod"
import { JobStatusEnumValue } from "../enum/JobStatusEnum"

export const JobAcceptedSchema = z.object({
    job_id: z.string()
});

const JobOutSchema = <T extends z.ZodTypeAny>(result: T) => {
    return z.object({
        job_id: z.string(),
        status: z.enum(JobStatusEnumValue),
        result: result.nullable(),
        error_code: z.string().nullable(),
        error_message: z.string().nullable()
    })
};
    
export const JobEventSchema = z.object({
    job_id: z.string(),
    status: z.enum(JobStatusEnumValue)
});

const JobImagePayloadSchema = z.object({
    data: z.string(), 
    mime_type: z.string()
})

export const JobImagePayloadOutSchema = JobOutSchema(JobImagePayloadSchema)

export type JobAcceptedType = z.infer<typeof JobAcceptedSchema>
export type JobEventType = z.infer<typeof JobEventSchema>
export type JobImagePayloadOutType = z.infer<typeof JobImagePayloadOutSchema>