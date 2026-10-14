import z from 'zod';
import { UseNewArticleFormValidationBase } from './ArticleFormValidationBase';
import { TypeArticleEnumValue } from '../../enum/TypeArticleEnum';
import { GenreEnumValue } from '../../enum/GenreEnum';
import { ThemeEnumValue } from '../../enum/ThemeEnum';

const {
    NewArticleFormValidationBase,
    UpdateArticleFormValidationBase,
    verifyMarquePersonnalisee,
    errorMarquePersonnalisee,
} = UseNewArticleFormValidationBase;

export const NewDeguisementFormValidationSchema = z
    .object({
        ...NewArticleFormValidationBase,
        typeImage: z.literal(TypeArticleEnumValue.DEGUISEMENT),
        genre: z.enum(GenreEnumValue, { error: 'Un déguisement doit avoir un genre' }),
        theme: z.enum(ThemeEnumValue, { error: 'Un déguisement doit avoir un thème' }),
    })
    .refine(verifyMarquePersonnalisee, errorMarquePersonnalisee);

export const UpdateDeguisementFormValidationSchema = z
    .object({
        ...UpdateArticleFormValidationBase,
        typeImage: z.literal(TypeArticleEnumValue.DEGUISEMENT),
        genre: z.enum(GenreEnumValue, { error: 'Un déguisement doit avoir un genre' }),
        theme: z.enum(ThemeEnumValue, { error: 'Un déguisement doit avoir un thème' }),
    })
    .refine(verifyMarquePersonnalisee, errorMarquePersonnalisee);

export type NewDeguisementFormValidationType = z.infer<typeof NewDeguisementFormValidationSchema>;
export type UpdateDeguisementFormValidationType = z.infer<
    typeof UpdateDeguisementFormValidationSchema
>;
