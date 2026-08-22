import {z} from "zod";

export const NewPelucheFormValidationSchema = z.object({
    marque: 
        z.string().trim().min(1, "La marque de la peluche ne peut pas être vide"),
    image: 
        z.instanceof(File, {message: "Une image est requise"})
        .refine((file) => 
            file.size > 0, 
            {message: "Le fichier ne peut pas être vide"}
        )
        .refine((file) => 
            file.size< 5 * 1024 * 1024, 
            {message: "Le fichier doit faire moins de 5 Mo"}
        )
        .refine((file) =>  
            ["image/png", "image/jpeg", "image/webp"].includes(file.type), 
            {message: "Le fichier doit être au format png, jpeg ou webp"}
        )
}); 

export type NewPelucheFormValidationType = z.infer<typeof NewPelucheFormValidationSchema>;