import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import {
    NewArticleFormValidationSchema,
    UpdateArticleFormValidationSchema,
    type UpdateArticleFormValidationType,
} from '../validation/form/ArticleFormValidation';
import type { TypeArticleEnum } from '../../enum/TypeArticleEnum';
import {
    useAddImageMutation,
    useGetImageByTypeQuery,
    useUpdateImageMutation,
} from '../../redux/features/images/ImageApi';
import { Button, createListCollection, VStack } from '@chakra-ui/react';
import TextAreaField from './fields/TextAreaField';
import NumberField from './fields/NumberField';
import { typeAgeCollection } from '../../enum/TypeAgeEnum';
import SelectField from './fields/SelectField';
import MediaField from './fields/MediaField';
import { TypeImageEnumValue } from '../../enum/TypeImageEnum';
import { useMemo } from 'react';
import { CUSTOM_BRAND } from '../validation/form/ArticleFormValidationBase';
import InputField from './fields/InputField';
import type { ImageSelect } from '../../types/ImageType';
import { TypeMediaEnumValue } from '../../enum/TypeMediaEnum';

type ArticleFormPropsType = {
    typeArticle: Exclude<TypeArticleEnum, 'DEGUISEMENT'>;
    article?: ImageSelect;
    onSuccess?: () => void;
};

function getDefaultValues(
    typeArticle: Exclude<TypeArticleEnum, 'DEGUISEMENT'>,
    article?: ImageSelect,
) {
    if (!article) {
        return {
            id: undefined,
            typeImage: typeArticle,
            typeAge: undefined,
            age: undefined,
            description: '',
            marque: undefined,
            image: undefined,
            idArt: undefined,
            marquePersonnalise: undefined,
        };
    }

    const isCustomBrand = article.marque?.startsWith(CUSTOM_BRAND);

    return {
        id: article.id,
        idArt: article.idArt ? article.idArt : undefined,
        description: article.description ?? '',
        age: article.age ? parseInt(article.age) : undefined,
        typeAge: article.typeAge,
        genre: undefined,
        theme: undefined,
        marque: isCustomBrand ? CUSTOM_BRAND : article.marque,
        marquePersonnalise: isCustomBrand ? article.marque?.slice(CUSTOM_BRAND.length) : undefined,
        image: undefined,
        typeImage: typeArticle,
    };
}

export default function ArticleForm({ typeArticle, article, onSuccess }: ArticleFormPropsType) {
    const [addArticle] = useAddImageMutation();
    const [updateArticle] = useUpdateImageMutation();

    const { data: marques } = useGetImageByTypeQuery(TypeImageEnumValue.MARQUE);

    const marqueCollection = useMemo(
        () =>
            createListCollection({
                items: [
                    { label: 'MARQUE PERSONNALISÉE', value: CUSTOM_BRAND },
                    ...(marques ?? []).map((m) => ({ label: m.marque, value: m.marque })),
                ],
            }),
        [marques],
    );

    const {
        control,
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm<UpdateArticleFormValidationType>({
        resolver: zodResolver(
            article ? UpdateArticleFormValidationSchema : NewArticleFormValidationSchema,
        ) as Resolver<UpdateArticleFormValidationType>,
        defaultValues: getDefaultValues(typeArticle, article),
    });

    function onSubmit(data: UpdateArticleFormValidationType) {
        if (article) {
            const { age, marque, marquePersonnalise, ...rest } = data;
            updateArticle({
                oldImage: article,
                newImage: {
                    ...rest,
                    age: String(age),
                    marque: marque === CUSTOM_BRAND ? '[PERSO]-' + marquePersonnalise : marque,
                    isEditeur: null,
                    idFou: null,
                },
            });
        } else {
            const { marquePersonnalise, marque, age, image, ...rest } = data;
            if (!image) return;
            addArticle({
                ...rest,
                image: image,
                marque: marque === CUSTOM_BRAND ? '[PERSO]-' + marquePersonnalise : marque,
                age: String(age),
                isEditeur: null,
                idFou: null,
            });
            reset();
        }
        onSuccess?.();
    }

    const selectedMarque = watch('marque');
    const isCustom = selectedMarque === CUSTOM_BRAND;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4} alignItems="center" justifyItems="center">
                    <NumberField
                        error={errors.idArt}
                        control={control}
                        name="idArt"
                        label="Identifiant article"
                    />
                    <TextAreaField
                        error={errors.description}
                        register={register('description')}
                        label="Description"
                    />
                    <NumberField error={errors.age} control={control} name={'age'} label={'âge'} />
                    <SelectField
                        error={errors.typeAge}
                        control={control}
                        name={'typeAge'}
                        label={"Type d'âge"}
                        collection={typeAgeCollection}
                    />
                    <SelectField
                        error={errors.marque}
                        control={control}
                        name={'marque'}
                        label={"Marque de l'article"}
                        collection={marqueCollection}
                    />
                    {isCustom && (
                        <InputField
                            error={errors.marquePersonnalise}
                            register={register('marquePersonnalise')}
                            fieldLabel={'Marque personnalisée'}
                            placeholder={' '}
                        />
                    )}
                    <MediaField
                        mediaType={TypeMediaEnumValue.IMAGE}
                        error={errors.image}
                        label="Ajouter une image"
                        name="image"
                        control={control}
                    />
                    <Button type="submit">{article ? "Modifier l'image" : "Créer l'image"}</Button>
                </VStack>
            </form>
        </>
    );
}
