import {z} from "zod";

export const newVideoFormValidationSchema = z.object({
        description: 
            z
            .string().trim(),
        age: 
            z
            .string().trim(),
        typeAge: 
            z
            .string().trim(),
        video: 
            z
            .instanceof(File, {message: "Une vidéo est requise."})
            .refine((file) => file.size > 0, {
                    message: "Le fichier vidéo ne peut pas être vide",
                })
            .refine((file) => file.size < 300 * 1_000_000, { message: "La vidéo doit faire moins de 300 Mo" })       
    }).refine(
        (data) => (!!data.age.trim()) === (!!data.typeAge.trim()),
        {
            message: "L'âge et le type doivent être renseignés ensemble",
            path: ["typeAge"],
        }
    )
    .refine(
        (data) => {
            if (data.age.trim() === "") return true;
            const n = Number(data.age);
            return !isNaN(n) && n > 0;
        },
        {
            message: "L'âge doit être un nombre supérieur à 0",
            path: ["age"],
        }
    )

export type newVideoFormValidationType = z.infer<typeof newVideoFormValidationSchema>;