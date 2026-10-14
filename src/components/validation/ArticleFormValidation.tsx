import z from 'zod';
import { UseNewArticleFormValidationBase } from './ArticleFormValidationBase';
import { TypeArticleEnumValue } from '../../enum/TypeArticleEnum';

const {
    NewArticleFormValidationBase,
    UpdateArticleFormValidationBase,
    verifyMarquePersonnalisee,
    errorMarquePersonnalisee,
} = UseNewArticleFormValidationBase;

export const NewArticleFormValidationSchema = z
    .object({
        ...NewArticleFormValidationBase,
        typeImage: z
            .enum(TypeArticleEnumValue, {
                error: "Le type d'image doit être un article",
            })
            .exclude([TypeArticleEnumValue.DEGUISEMENT], {
                error: 'Un déguisement doit avoir un thème et un genre',
            }),
    })
    .refine(verifyMarquePersonnalisee, errorMarquePersonnalisee);

export const UpdateArticleFormValidationSchema = z
    .object({
        ...UpdateArticleFormValidationBase,
        typeImage: z
            .enum(TypeArticleEnumValue, {
                error: "Le type d'image doit être un article",
            })
            .exclude([TypeArticleEnumValue.DEGUISEMENT], {
                error: 'Un déguisement doit avoir un thème et un genre',
            }),
    })
    .refine(verifyMarquePersonnalisee, errorMarquePersonnalisee);

export type NewArticleFormValidationType = z.infer<typeof NewArticleFormValidationSchema>;
export type UpdateArticleFormValidationType = z.infer<typeof UpdateArticleFormValidationSchema>;
