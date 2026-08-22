import {z} from "zod";

export const NewJouetFormValidationSchema = z.object({
    typeImage:
        z.literal("JOUET"),
    typeAge: 
        z.string().trim(),
    age:
        z.string().trim(),
    description: 
        z.string().trim().min(1, "La description ne peut pas être vide"),
    image: 
        z.instanceof(File, {message: "Une image est requise"})
        .refine((file) => 
            file.size > 0,
            {message: "Le fichier ne peut pas être vide"} 
        ).refine((file) => 
            file.size< 5 * 1024 * 1024, 
            {message: "Le fichier doit faire moins de 5 Mo"}
        ).refine((file) => 
            ["image/png", "image/jpeg", "image/webp"].includes(file.type),
            {message : "Le fichier doit être au format png, jpeg ou webp"}
        )
}).refine((data) => 
    (!!data.age.trim()) === (!!data.typeAge.trim()), 
    {
        message: "L'âge et le type doivent être renseignés ensemble",
        path:["typeAge"]
    }
).refine((data) => {
            if (data.age.trim() === "") return true;
            const n = Number(data.age);
            return !isNaN(n) && n > 0;
        },
        {
            message: "L'âge doit être un nombre supérieur à 0",
            path: ["age"],
        }
);

export type NewJouetFormValidationType = z.infer<typeof NewJouetFormValidationSchema>;