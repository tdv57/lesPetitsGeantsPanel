import { Button, createListCollection, VStack, Image } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import {
    MarqueFormValidationBase,
    NewMarqueFormValidationSchema,
    UpdateMarqueFormValidationSchema,
    type UpdateMarqueFormValidationType,
} from '../validation/form/MarqueFormValidation';
import { useAddImageMutation, useUpdateImageMutation } from '../../redux/features/images/ImageApi';
import InputField from './fields/InputField';
import NumberField from './fields/NumberField';
import SelectField from './fields/SelectField';
import MediaField from './fields/MediaField';
import type { ImageSelect } from '../../types/ImageType';
import { TypeImageEnumValue } from '../../enum/TypeImageEnum';
import { TypeMediaEnumValue } from '../../enum/TypeMediaEnum';
import { z } from 'zod';
import { useGenerateForm } from '../../hook/useGenerateForm';
import { GenerateAccordion } from '../accordion/GenerateAccordion';
import { ErrorMessage } from '../error/ErrorMessage';
import { COLORS } from '../../theme/Couleur';
import { useFormDraft } from '../../hook/useFormDraft';

type MarqueFormPropsType = {
    onSuccess?: () => void;
    marque?: ImageSelect;
};

function getDefaultValues(getDraft: () => Record<string, unknown>, marque?: ImageSelect) {
    if (!marque) {
        const start = {
            idFou: null as unknown as undefined,
            marque: '',
            isEditeur: null as unknown as undefined,
            image: null as unknown as undefined,
            typeImage: TypeImageEnumValue.MARQUE,
        };
        return {
            ...start,
            ...getDraft(),
        };
    }

    return {
        id: marque.id,
        idFou: marque.idFou ? marque.idFou : (null as unknown as undefined),
        marque: marque.marque,
        isEditeur:
            marque.isEditeur === null || marque.isEditeur === undefined
                ? (null as unknown as undefined)
                : (String(marque.isEditeur) as 'true' | 'false'),
        image: null as unknown as undefined,
        typeImage: TypeImageEnumValue.MARQUE,
    };
}

export function MarqueForm({ onSuccess, marque }: MarqueFormPropsType) {
    const [addMarque] = useAddImageMutation();
    const [updateMarque] = useUpdateImageMutation();
    const draftKey = marque ? null : `marque-${TypeImageEnumValue.MARQUE}`;
    const {
        getDraft,
        useSaveDraft,
        reset: resetAll,
    } = useFormDraft<UpdateMarqueFormValidationType>(draftKey);
    const emptyDefaultValues = getDefaultValues(() => ({}), marque);
    const {
        control,
        handleSubmit,
        register,
        reset,
        watch,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<UpdateMarqueFormValidationType>({
        resolver: zodResolver(
            marque ? UpdateMarqueFormValidationSchema : NewMarqueFormValidationSchema,
        ) as Resolver<UpdateMarqueFormValidationType>,
        defaultValues: getDefaultValues(getDraft, marque),
    });
    useSaveDraft(watch);

    const shape = z.object({
        ...MarqueFormValidationBase,
    });
    const onResult = (fields: Record<string, unknown>, image: File) => {
        for (const [key, value] of Object.entries(fields)) {
            setValue(key as never, value as never, { shouldValidate: true, shouldDirty: true });
        }
        setValue('image', image, { shouldValidate: true });
    };
    const basePrompt = 'Pour la marque les valeurs suivantes sont déjà connues: ';
    const validationSchemaForSafeParse = NewMarqueFormValidationSchema;
    const ignored = ['id', 'idFou', 'typeImage', 'image'];
    const {
        jobOutData,
        jobErrorMessage,
        isLocked,
        onGenerateSubmit: _onGenerateSubmit,
        resetGenerate,
    } = useGenerateForm({
        keyJobId: draftKey,
        shape,
        basePrompt,
        validationSchemaForSafeParse,
        onResult,
        getValues,
        ignored,
        typeImage: TypeImageEnumValue.MARQUE,
    });

    const handleReset = () => {
        resetAll(() => {
            reset(emptyDefaultValues);
            resetGenerate();
        });
    };

    function onGenerateSubmit(prompt: string) {
        _onGenerateSubmit(prompt);
    }

    function onSubmit(data: UpdateMarqueFormValidationType) {
        const { isEditeur, ...rest } = data;
        if (marque) {
            updateMarque({
                oldImage: marque,
                newImage: {
                    ...rest,
                    id: marque.id,
                    idArt: null,
                    isEditeur: isEditeur === 'true',
                },
            });
        } else {
            addMarque({
                ...rest,
                isEditeur: isEditeur === 'true',
                idArt: null,
                genre: undefined,
                theme: undefined,
            });
            handleReset();
        }
        onSuccess?.();
    }

    const isEditeurCollection = createListCollection({
        items: [
            { label: 'Oui', value: 'true' },
            { label: 'Non', value: 'false' },
        ],
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4} alignItems="center" justifyItems="center">
                    <NumberField
                        error={errors.idFou}
                        control={control}
                        name={'idFou'}
                        label="Identifiant fournisseur"
                        locked={isLocked}
                    />
                    <InputField
                        error={errors.marque}
                        register={register('marque')}
                        fieldLabel="Nom de la marque"
                        placeholder=""
                        locked={isLocked}
                    />
                    <SelectField
                        error={errors.isEditeur}
                        control={control}
                        name="isEditeur"
                        label="Est-ce un éditeur ?"
                        collection={isEditeurCollection}
                        locked={isLocked}
                    />
                    <MediaField
                        mediaType={TypeMediaEnumValue.IMAGE}
                        error={errors.image}
                        control={control}
                        label={'Image de la marque'}
                        name="image"
                        locked={isLocked}
                    />
                    {jobOutData ? (
                        <Image
                            src={`data:${jobOutData.image.mime_type};base64,${jobOutData.image.data}`}
                            alt="Image traitée"
                            w="100%"
                            maxH="480px"
                            objectFit="contain"
                            borderRadius="lg"
                            boxShadow="md"
                            bg={COLORS.backgroundCard}
                        />
                    ) : (
                        <></>
                    )}
                    <Button disabled={isLocked} type="submit">
                        {marque ? "Modifier l'image" : "Créer l'image"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLocked}
                        onClick={() => handleReset()}
                    >
                        Réinitialiser
                    </Button>
                    <GenerateAccordion
                        draftKey={`IA-${draftKey}`}
                        locked={isLocked}
                        onSubmit={onGenerateSubmit}
                        typeImage={TypeImageEnumValue.MARQUE}
                    />
                    {jobErrorMessage ? (
                        <ErrorMessage
                            title={'Erreur lors de la génération de donnée'}
                            description={jobErrorMessage}
                            onClose={() => {}}
                        />
                    ) : (
                        <></>
                    )}
                </VStack>
            </form>
        </>
    );
}
