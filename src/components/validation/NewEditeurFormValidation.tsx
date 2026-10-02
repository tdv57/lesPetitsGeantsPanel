import { z } from 'zod';
import { TYPE_IMAGE_VALUE } from '../../types/ImageType';

export const NewEditeurFormValidationSchema = z.object({
    typeImage: z.literal(TYPE_IMAGE_VALUE.EDITEUR),
    marque: z.string().trim().min(1, "Le nom de l'éditeur ne peut pas être vide"),
});

export type NewEditeurFormValidationType = z.infer<typeof NewEditeurFormValidationSchema>;
