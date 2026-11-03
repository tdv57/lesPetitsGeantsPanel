import z from "zod";

export const GenerateFormValidationSchema = z.object({
    multicodes: z.array(z.object({
        value: z.string().min(1, { error: 'Le multicode ne peut pas être vide' }).regex(/^\d+$/, { error: "Le multicode ne doit contenir que des chiffre" })
    })),
    commentaire: z.string().optional(),
    designation: z.string().optional(),
})

export type GenerateFormValidationType = z.infer<typeof GenerateFormValidationSchema>;