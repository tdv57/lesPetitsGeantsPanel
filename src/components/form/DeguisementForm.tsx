import { useForm, type Resolver } from 'react-hook-form';
import {
    useAddImageMutation,
    useGetImageByTypeQuery,
    useUpdateImageMutation,
} from '../../redux/features/images/ImageApi';
import {
    type UpdateDeguisementFormValidationType,
    NewDeguisementFormValidationSchema,
    UpdateDeguisementFormValidationSchema,
} from '../validation/form/DeguisementFormValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemeEnumValue } from '../../enum/ThemeEnum';
import { createListCollection } from '@ark-ui/react/select';
import { GenreEnumValue } from '../../enum/GenreEnum';
import { Button, VStack, Image } from '@chakra-ui/react';
import { typeAgeCollection } from '../../mapper/AgeMapper';
import { TypeImageEnumValue } from '../../enum/TypeImageEnum';
import TextAreaField from './fields/TextAreaField';
import NumberField from './fields/NumberField';
import SelectField from './fields/SelectField';
import InputField from './fields/InputField';
import { CUSTOM_BRAND, NewArticleFormValidationBase } from '../validation/form/ArticleFormValidationBase';
import { useMemo } from 'react';
import MediaField from './fields/MediaField';
import type { ImageSelect } from '../../types/ImageType';
import { TypeMediaEnumValue } from '../../enum/TypeMediaEnum';
import z from 'zod';
import { useGenerateForm } from '../../hook/useGenerateForm';
import { COLORS } from '../../theme/Couleur';
import { ErrorMessage } from '../error/ErrorMessage';
import { GenerateAccordion } from '../accordion/GenerateAccordion';
import { useFormDraft } from '../../hook/useFormDraft';

type DeguisementFormPropsType = {
    deguisement?: ImageSelect;
    onSuccess?: () => void;
};

const themeCollection = createListCollection({
    items: [...Object.values(ThemeEnumValue).map((m) => ({ label: m, value: m }))],
});

const genreCollection = createListCollection({
    items: [...Object.values(GenreEnumValue).map((m) => ({ label: m, value: m }))],
});

function getDefaultValues( getDraft: () => Record<string, unknown> ,deguisement?: ImageSelect) {
    if (!deguisement) {
        const start = {
            idArt: undefined,
            description: '',
            age: undefined,
            typeAge: undefined,
            genre: undefined,
            theme: undefined,
            marque: undefined,
            marquePersonnalise: undefined,
            image: undefined,
            typeImage: TypeImageEnumValue.DEGUISEMENT,
        };
        return {
            ...start,
            ...getDraft()
        };
    }

    const isCustomBrand = deguisement.marque?.startsWith(CUSTOM_BRAND);

    return {
        idArt: deguisement.idArt ? deguisement.idArt : undefined,
        description: deguisement.description ?? '',
        age: deguisement.age ? parseInt(deguisement.age) : undefined,
        typeAge: deguisement.typeAge,
        genre: deguisement.genre,
        theme: deguisement.theme,
        marque: isCustomBrand ? CUSTOM_BRAND : deguisement.marque,
        marquePersonnalise: isCustomBrand
            ? deguisement.marque?.slice(CUSTOM_BRAND.length)
            : undefined,
        image: undefined,
        typeImage: TypeImageEnumValue.DEGUISEMENT,
    };
}

export function DeguisementForm({ deguisement, onSuccess }: DeguisementFormPropsType) {
    const [addDeguisement] = useAddImageMutation();
    const [updateDeguisement] = useUpdateImageMutation();
    const draftKey = deguisement ? null : `deguisement-${TypeImageEnumValue.DEGUISEMENT}`;
    const {getDraft, useSaveDraft, reset: resetAll} = useFormDraft<UpdateDeguisementFormValidationType>(draftKey);
    const emptyDefaultValues = getDefaultValues(() => ({}), deguisement);
    const { data: marques = [] } = useGetImageByTypeQuery(TypeImageEnumValue.MARQUE);
    const marqueCollection = useMemo(
        () =>
            createListCollection({
                items: [
                    { label: 'MARQUE PERSONNALISÉE', value: CUSTOM_BRAND },
                    ...(marques ?? []).map((marque) => ({
                        label: marque.marque,
                        value: marque.marque,
                    })),
                ],
            }),
        [marques],
    );

    const {
        control,
        handleSubmit,
        register,
        getValues,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<UpdateDeguisementFormValidationType>({
        resolver: zodResolver(
            deguisement
                ? UpdateDeguisementFormValidationSchema
                : NewDeguisementFormValidationSchema,
        ) as Resolver<UpdateDeguisementFormValidationType>,
        defaultValues: getDefaultValues(getDraft, deguisement),
    });
    useSaveDraft(watch);

    const shape = z.object({
        ...NewArticleFormValidationBase, 
        genre: z.enum(GenreEnumValue, { error: 'Un déguisement doit avoir un genre' }),
        theme: z.enum(ThemeEnumValue, { error: 'Un déguisement doit avoir un thème' }),        
        marque: marques.length > 0
        ? z.enum(marques.map((m) => m.marque) as [string, ...string[]])
        : NewArticleFormValidationBase.marque},
    ); 
    const onResult = (fields: Record<string, unknown>, image: File) => {
        for (const [key, value] of Object.entries(fields)) {
            setValue(key as never, value as never, { shouldValidate: true, shouldDirty: true });
        }
        setValue('image', image, { shouldValidate: true });
    }
    const basePrompt = "Pour l'article les valeurs suivantes sont déjà connues: ";
    const validationSchemaForSafeParse = NewDeguisementFormValidationSchema
    const ignored = ['id', 'idArt', 'typeImage', 'image', 'marquePersonnalise'];
    const { jobOutData, jobErrorMessage, isLocked, resetGenerate, onGenerateSubmit: _onGenerateSubmit } = useGenerateForm({
        keyJobId: draftKey,
        shape,
        basePrompt,
        validationSchemaForSafeParse, 
        onResult,
        getValues,
        ignored,
        typeImage: TypeImageEnumValue.DEGUISEMENT
    })

    const handleReset = () => {
        resetAll(() => {reset(emptyDefaultValues); resetGenerate();});
    }

    function onGenerateSubmit(prompt : string) {
        _onGenerateSubmit(prompt);
    }

    function onSubmit(data: UpdateDeguisementFormValidationType) {
        if (deguisement) {
            const { age, marque, marquePersonnalise, ...rest } = data;
            updateDeguisement({
                oldImage: deguisement,
                newImage: {
                    ...rest,
                    age: String(age),
                    marque: marque === CUSTOM_BRAND ? '[PERSO]-' + marquePersonnalise : marque,
                    isEditeur: null,
                    idFou: null,
                },
            });
        } else {
            const { age, marque, marquePersonnalise, image, ...rest } = data;
            if (!image) return;
            addDeguisement({
                ...rest,
                image: image,
                age: String(age),
                marque: marque === CUSTOM_BRAND ? '[PERSO]-' + marquePersonnalise : marque,
                isEditeur: null,
                idFou: null,
            });
            handleReset();
        }
        onSuccess?.();
    }


    const marqueSelected = watch('marque');
    const isCustom = marqueSelected === CUSTOM_BRAND;

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
                    <SelectField
                        error={errors.genre}
                        control={control}
                        name={'genre'}
                        label="Genre"
                        collection={genreCollection}
                        locked={isLocked}
                    />
                    <SelectField
                        error={errors.theme}
                        control={control}
                        name={'theme'}
                        label="Thème"
                        collection={themeCollection}
                        locked={isLocked}
                    />
                    <NumberField error={errors.age} control={control} name={'age'} label={'âge'}  locked={isLocked} />
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
                    <Button disabled={isLocked} type="submit" >{deguisement ? "Modifier l'image" : "Créer l'image"}</Button>
                    <Button type="button" variant="outline" disabled={isLocked} onClick={() => handleReset()}>
                        Réinitialiser
                    </Button>
                    <GenerateAccordion draftKey={draftKey} locked={isLocked} onSubmit={onGenerateSubmit} typeImage={TypeImageEnumValue.DEGUISEMENT} />
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
