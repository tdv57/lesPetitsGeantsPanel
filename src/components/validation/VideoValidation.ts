import { z } from 'zod';

export const videoValidation = z
    .instanceof(File, { message: 'Une vidéo est requise.' })
    .refine((file) => file.size > 0, {
        message: 'Le fichier vidéo ne peut pas être vide',
    })
    .refine((file) => file.size < 300 * 1024 * 1024, {
        message: 'La vidéo doit faire moins de 300 Mo',
    });
