import { JobStatusEnumValue } from '../enum/JobStatusEnum';
import { z } from "zod"
import { TypeImageEnumValue } from '../enum/TypeImageEnum';

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

export const GenerateOutSchema = z.object({
    image: ImagePayloadSchema,
    fields: z.record(z.string(), z.unknown())
})

export const JobGenerateOutSchema = JobOutSchema(GenerateOutSchema);

export const GenerateInSchema = z.object({
    prompt: z.string().min(1, { error: "Le prompt ne peut pas être vide"}).max(2000, { error: "Le prompt doit avoir au plus 2000 caractères"}),
    json_schema: z.string().max(20000, { error: "Le schéma ne peut pas dépasser 20000 caractères"}),
    type_image: z.enum(TypeImageEnumValue),
    image: ImagePayloadSchema.nullable()
});

