import { z } from "zod";
import { TypeMediaEnumValue } from "../../../enum/TypeMediaEnum";
import { imageValidation } from "../ImageValidation";
import { videoValidation } from "../VideoValidation";

const AnnonceBaseShape = {
    commentaire: z.string().max(200, {
        error: 'Le commentaire ne peut pas dépasser 200 caractères',
    }),
    redirectionLink: z.url().optional().or(z.literal(''))
};

const AnnonceBaseFormValidation = z.discriminatedUnion(
    'mediaType',
    [
        z.object({
            ...AnnonceBaseShape,
            mediaType: z.literal(TypeMediaEnumValue.IMAGE),
            file: imageValidation
        }),
        z.object({
            ...AnnonceBaseShape,
            mediaType: z.literal(TypeMediaEnumValue.VIDEO), 
            file: videoValidation
        }),
    ],
    { error: 'Il faut indiquer si le fichier est une image ou une vidéo'}
);

export const NewAnnonceFormValidationSchema = AnnonceBaseFormValidation;
export const UpdateAnnonceFormValidationSchema = z.discriminatedUnion(
    'mediaType',
    [
        z.object({
            ...AnnonceBaseShape,
            mediaType: z.literal(TypeMediaEnumValue.IMAGE),
            file: imageValidation.optional(),
            id: z.number().min(1, { error: 'L\'identifiant doit être présent et plus grand que 1'}),
        }),
        z.object({
            ...AnnonceBaseShape,
            mediaType: z.literal(TypeMediaEnumValue.VIDEO), 
            file: videoValidation.optional(),
            id: z.number().min(1, { error: 'L\'identifiant doit être présent et plus grand que 1'}),
        }),
    ]
)

export type NewAnnonceFormValidationType = z.infer<typeof NewAnnonceFormValidationSchema>;
export type UpdateAnnonceFormValidationType = z.infer<typeof UpdateAnnonceFormValidationSchema>;