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
import { Button, createListCollection, VStack, Image } from '@chakra-ui/react';
import TextAreaField from './fields/TextAreaField';
import NumberField from './fields/NumberField';
import { typeAgeCollection } from '../../enum/TypeAgeEnum';
import SelectField from './fields/SelectField';
import MediaField from './fields/MediaField';
import { TypeImageEnumValue } from '../../enum/TypeImageEnum';
import { useMemo } from 'react';
import { CUSTOM_BRAND, NewArticleFormValidationBase } from '../validation/form/ArticleFormValidationBase';
import InputField from './fields/InputField';
import type { ImageSelect } from '../../types/ImageType';
import { TypeMediaEnumValue } from '../../enum/TypeMediaEnum';
import { GenerateAccordion } from '../accordion/GenerateAccordion';
import z from 'zod';
import { ErrorMessage } from '../error/ErrorMessage';
import { COLORS } from '../../theme/Couleur';
import { useGenerateForm } from '../../hook/useGenerateForm';
import { useFormDraft } from '../../hook/useFormDraft';

type ArticleFormPropsType = {
    typeArticle: Exclude<TypeArticleEnum, 'DEGUISEMENT'>;
    article?: ImageSelect;
    onSuccess?: () => void;
};

function getDefaultValues(
    typeArticle: Exclude<TypeArticleEnum, 'DEGUISEMENT'>,
    getDraft: () => Record<string, unknown> ,
    article?: ImageSelect,
) {
    if (!article) {
        const start = {
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
        return {
            ...start,
            ...getDraft()
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
    const { data: marques = [] } = useGetImageByTypeQuery(TypeImageEnumValue.MARQUE);
    const draftKey = article ? null : `article-${typeArticle}`;
    const {getDraft, useSaveDraft, reset: resetAll} = useFormDraft<UpdateArticleFormValidationType>(draftKey);
    const emptyDefaultValues = getDefaultValues(typeArticle, () => ({}), article);
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
        getValues,
        setValue,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm<UpdateArticleFormValidationType>({
        resolver: zodResolver(
            article ? UpdateArticleFormValidationSchema : NewArticleFormValidationSchema,
        ) as Resolver<UpdateArticleFormValidationType>,
        defaultValues: getDefaultValues(typeArticle, getDraft, article ),
    });

    useSaveDraft(watch);

    const onResult = (fields: Record<string, unknown>, image: File) => {
        for (const [key, value] of Object.entries(fields)) {
            setValue(key as never, value as never, { shouldValidate: true, shouldDirty: true });
        }
        setValue('image', image, { shouldValidate: true });
    }

    const handleReset = () => {
        resetAll(() => {reset(emptyDefaultValues), resetGenerate()});
    }

    const shape = z.object({
        ...NewArticleFormValidationBase,         
        marque: marques.length > 0
        ? z.enum(marques.map((m) => m.marque) as [string, ...string[]])
        : NewArticleFormValidationBase.marque}); 
    const basePrompt = "Pour l'article les valeurs suivantes sont déjà connues: ";
    const validationSchemaForSafeParse = NewArticleFormValidationSchema
    const ignored = ['id', 'idArt', 'typeImage', 'image', 'marquePersonnalise'];
    const { jobOutData, jobErrorMessage, isLocked, onGenerateSubmit: _onGenerateSubmit, resetGenerate } = useGenerateForm({
        keyJobId: draftKey,
        shape,
        basePrompt,
        validationSchemaForSafeParse, 
        onResult,
        getValues,
        ignored,
        typeImage: typeArticle
    })

    function onGenerateSubmit(prompt : string) {
        _onGenerateSubmit(prompt);
    }

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
            handleReset();
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
                        locked={isLocked}
                    />
                    <TextAreaField
                        error={errors.description}
                        register={register('description')}
                        label="Description"
                        locked={isLocked}
                    />
                    <NumberField error={errors.age} control={control} name={'age'} label={'âge'} locked={isLocked}/>
                    <SelectField
                        error={errors.typeAge}
                        control={control}
                        name={'typeAge'}
                        label={"Type d'âge"}
                        collection={typeAgeCollection}
                        locked={isLocked}
                    />
                    <SelectField
                        error={errors.marque}
                        control={control}
                        name={'marque'}
                        label={"Marque de l'article"}
                        collection={marqueCollection}
                        locked={isLocked}
                    />
                    {isCustom && (
                        <InputField
                            error={errors.marquePersonnalise}
                            register={register('marquePersonnalise')}
                            fieldLabel={'Marque personnalisée'}
                            placeholder={' '}
                            locked={isLocked}
                        />
                    )}
                    <MediaField
                        mediaType={TypeMediaEnumValue.IMAGE}
                        error={errors.image}
                        label="Ajouter une image"
                        name="image"
                        control={control}
                        locked={isLocked}
                    />
                    {jobOutData ?                         
                        <Image
                            src={`data:${jobOutData.image.mime_type};base64,${jobOutData.image.data}`}
                            alt="Image traitée"
                            w="100%"
                            maxH="480px"
                            objectFit="contain"
                            borderRadius="lg"
                            boxShadow="md"
                            bg={COLORS.backgroundCard}
                        /> : 
                        <></>
                    }
                    <Button disabled={isLocked} type="submit">{article ? "Modifier l'image" : "Créer l'image"}</Button>
                    <Button type="button" variant="outline" disabled={isLocked} onClick={() => handleReset()}>
                        Réinitialiser
                    </Button>
                    <GenerateAccordion draftKey={draftKey} locked={isLocked} onSubmit={onGenerateSubmit} typeImage={typeArticle} />
                    { jobErrorMessage ? 
                        <ErrorMessage 
                            title={"Erreur lors de la génération de donnée"} 
                            description={jobErrorMessage}
                            onClose={() => {}}
                        /> 
                        :
                        <></>}
                </VStack>
            </form>
        </>
    );
}
