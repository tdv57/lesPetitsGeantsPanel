import { z } from 'zod';
import { TypeImageEnumValue } from '../../../enum/TypeImageEnum';
import { imageValidation } from '../ImageValidation';

export const MarqueFormValidationBase = {
    typeImage: z.literal(TypeImageEnumValue.MARQUE),
    marque: z.string().trim().min(1, 'Le nom de la marque ne peut pas être vide'),
    idFou: z.int({ error: "L'identifiant de fournisseur est obligatoire" }),
    isEditeur: z.enum(['true', 'false'], {
        error: 'Il faut indiquer si la marque est un éditeur ou non',
    }),
    image: imageValidation,   
}
export const NewMarqueFormValidationSchema = z.object({
    ...MarqueFormValidationBase
});

export const UpdateMarqueFormValidationSchema = z.object({
    ...MarqueFormValidationBase,
    id: z.int({ error: "L'identifiant est obligatoire" }),
    image: imageValidation.optional(),
});

export type UpdateMarqueFormValidationType = z.infer<typeof NewMarqueFormValidationSchema>;
export type NewMarqueFormValidationType = z.infer<typeof NewMarqueFormValidationSchema>;
