import { z } from 'zod';

export const NewJeuDeSocieteFormValidationSchema = z
    .object({
        typeImage: z.literal('JEU DE SOCIETE'),
        description: z.string().trim().min(1, 'La description ne peut pas être vide'),
        typeAge: z.string().trim(),
        age: z.string().trim(),
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
    .superRefine((data, ctx) => {
        ageAndAgeTypeEmptyOrFullTogether(data.age, data.typeAge, ctx);
        ageIsNumberAndGreaterThan0(data.age, ctx);
    });

export type NewJeuDeSocieteFormValidationType = z.infer<typeof NewJeuDeSocieteFormValidationSchema>;

function ageAndAgeTypeEmptyOrFullTogether(
    age: string,
    typeAge: string,
    ctx: z.core.$RefinementCtx<{
        description: string;
        typeAge: string;
        age: string;
        image: File;
    }>,
) {
    if (!(!!age.trim() === !!typeAge.trim())) {
        ctx.addIssue({
            code: 'custom',
            message: "L'âge et le type doivent être renseignés ensemble",
            path: ['age'],
        });
        ctx.addIssue({
            code: 'custom',
            message: "L'âge et le type doivent être renseignés ensemble",
            path: ['typeAge'],
        });
    }
}

function ageIsNumberAndGreaterThan0(
    age: string,
    ctx: z.core.$RefinementCtx<{
        description: string;
        typeAge: string;
        age: string;
        image: File;
    }>,
) {
    if (age.trim() !== '') {
        const n = Number(age.trim());
        if (isNaN(n) || n <= 0) {
            ctx.addIssue({
                code: 'custom',
                message: "L'âge doit être un nombre supérieur à 0",
                path: ['age'],
            });
        }
    }
}
