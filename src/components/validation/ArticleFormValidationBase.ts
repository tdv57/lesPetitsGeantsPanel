import { z } from 'zod';
import { TypeAgeEnumValue } from '../../enum/TypeAgeEnum';

export const CUSTOM_BRAND = '__custom__';

const ArticleFormValidationBase = {
    typeAge: z.enum(TypeAgeEnumValue, {
        error: "Vous devez choisir si l'âge est en année ou en mois",
    }),
    age: z
        .int({ error: "L'âge est obligatoire" })
        .max(100, "L'âge ne peut pas être plus grand que 100")
        .min(1, "L'âge ne peut pas être plus petit que 1"),
    description: z.string().max(200),
    marque: z.string().trim().min(1, 'La marque de la peluche ne peut pas être vide'),
    marquePersonnalise: z.string().trim().optional(),
    image: z
        .instanceof(File, { message: 'Une image est requise' })
        .refine((file) => file.size < 5 * 1024 * 1024, {
            message: 'Le fichier doit faire moins de 5 Mo',
        })
        .refine((file) => ['image/png', 'image/jpeg', 'image/webp'].includes(file.type), {
            message: 'Le fichier doit être au format png, jpeg ou webp',
        }),
    idArt: z.int({ error: "L'identifiant d'article est obligatoire" }),
};

const NewArticleFormValidationBase = {
    ...ArticleFormValidationBase,
    image: z
        .instanceof(File, { message: 'Une image est requise' })
        .refine((file) => file.size < 5 * 1024 * 1024, {
            message: 'Le fichier doit faire moins de 5 Mo',
        })
        .refine((file) => ['image/png', 'image/jpeg', 'image/webp'].includes(file.type), {
            message: 'Le fichier doit être au format png, jpeg ou webp',
        }),
};

const UpdateArticleFormValidationBase = {
    ...ArticleFormValidationBase,
    image: z
        .instanceof(File, { message: 'Une image est requise' })
        .refine((file) => file.size < 5 * 1024 * 1024, {
            message: 'Le fichier doit faire moins de 5 Mo',
        })
        .refine((file) => ['image/png', 'image/jpeg', 'image/webp'].includes(file.type), {
            message: 'Le fichier doit être au format png, jpeg ou webp',
        })
        .optional(),
    id: z.int({ error: "L'identifiant de l'image est obligatoire" }),
};

export function verifyMarquePersonnalisee(data: { marque: string; marquePersonnalise?: string }) {
    return data.marque !== CUSTOM_BRAND || !!data.marquePersonnalise;
}

export const errorMarquePersonnalisee = {
    path: ['marquePersonnalise'],
    error: 'Le nom de la marque personnalisée ne peut pas être vide',
};

export const UseNewArticleFormValidationBase = {
    NewArticleFormValidationBase,
    UpdateArticleFormValidationBase,
    verifyMarquePersonnalisee,
    errorMarquePersonnalisee,
};
