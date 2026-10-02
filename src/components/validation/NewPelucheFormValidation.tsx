import { z } from 'zod';
import { TYPE_IMAGE_VALUE } from '../../types/ImageType';

export const CUSTOM_BRAND = '__custom__';

export const NewPelucheFormValidationSchema = z
    .object({
        typeImage: z.literal(TYPE_IMAGE_VALUE.PELUCHE),
        marque: z.string().trim().min(1, 'La marque de la peluche ne peut pas être vide'),
        marquePersonnalise: z.string().trim().optional(),
        image: z
            .instanceof(File, { message: 'Une image est requise' })
            .refine((file) => file.size > 0, { message: 'Le fichier ne peut pas être vide' })
            .refine((file) => file.size < 5 * 1024 * 1024, {
                message: 'Le fichier doit faire moins de 5 Mo',
            })
            .refine((file) => ['image/png', 'image/jpeg', 'image/webp'].includes(file.type), {
                message: 'Le fichier doit être au format png, jpeg ou webp',
            }),
    })
    .refine((data) => data.marque === CUSTOM_BRAND && !data.marquePersonnalise, {
        path: ['marquePersonnalise'],
        message: 'Le nom de la marque personnalisée ne peut pas être vide',
    });

export type NewPelucheFormValidationType = z.infer<typeof NewPelucheFormValidationSchema>;
