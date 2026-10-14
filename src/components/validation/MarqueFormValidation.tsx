import { z } from 'zod';
import { TypeImageEnumValue } from '../../enum/TypeImageEnum';

export const NewMarqueFormValidationSchema = z.object({
    typeImage: z.literal(TypeImageEnumValue.MARQUE),
    marque: z.string().trim().min(1, 'Le nom de la marque ne peut pas être vide'),
    idFou: z.int({ error: "L'identifiant de fournisseur est obligatoire" }),
    isEditeur: z.enum(['true', 'false'], {
        message: 'Il faut indiquer si la marque est un éditeur ou non',
    }),
    image: z
        .instanceof(File, { message: 'Une image est requise' })
        .refine((file) => file.size > 0, { message: 'Le fichier ne peut pas être vide' })
        .refine((file) => file.size < 5 * 1024 * 1024, {
            message: 'Le fichier doit faire moins de 5 Mo',
        })
        .refine((file) => ['image/png', 'image/jpeg', 'image/webp'].includes(file.type), {
            message: 'Le fichier doit être au format png, jpeg ou webp',
        }),
});

export const UpdateMarqueFormValidationSchema = z.object({
    id: z.int({ error: "L'identifiant est obligatoire" }),
    typeImage: z.literal(TypeImageEnumValue.MARQUE),
    marque: z.string().trim().min(1, 'Le nom de la marque ne peut pas être vide'),
    idFou: z.int({ error: "L'identifiant de fournisseur est obligatoire" }),
    isEditeur: z.enum(['true', 'false'], {
        message: 'Il faut indiquer si la marque est un éditeur ou non',
    }),
    image: z
        .instanceof(File, { message: 'Une image est requise' })
        .refine((file) => file.size > 0, { message: 'Le fichier ne peut pas être vide' })
        .refine((file) => file.size < 5 * 1024 * 1024, {
            message: 'Le fichier doit faire moins de 5 Mo',
        })
        .refine((file) => ['image/png', 'image/jpeg', 'image/webp'].includes(file.type), {
            message: 'Le fichier doit être au format png, jpeg ou webp',
        })
        .optional(),
});

export type UpdateMarqueFormValidationType = z.infer<typeof NewMarqueFormValidationSchema>;
export type NewMarqueFormValidationType = z.infer<typeof NewMarqueFormValidationSchema>;
