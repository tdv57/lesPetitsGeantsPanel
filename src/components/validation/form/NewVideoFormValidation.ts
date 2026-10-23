import { z } from 'zod';
import { videoValidation } from '../VideoValidation';
export const newVideoFormValidationSchema = z
    .object({
        description: z.string().trim(),
        age: z.string().trim(),
        typeAge: z.string().trim(),
        video: videoValidation
    })
    .refine((data) => !!data.age.trim() === !!data.typeAge.trim(), {
        message: "L'âge et le type doivent être renseignés ensemble",
        path: ['typeAge'],
    })
    .refine(
        (data) => {
            if (data.age.trim() === '') return true;
            const n = Number(data.age);
            return !isNaN(n) && n > 0;
        },
        {
            message: "L'âge doit être un nombre supérieur à 0",
            path: ['age'],
        },
    );

export type newVideoFormValidationType = z.infer<typeof newVideoFormValidationSchema>;
