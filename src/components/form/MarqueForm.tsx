import { Button, createListCollection, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import {
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

type MarqueFormPropsType = {
    onSuccess?: () => void;
    marque?: ImageSelect;
};

function getDefaultValues(marque?: ImageSelect) {
    if (!marque) {
        return {
            idFou: undefined,
            marque: undefined,
            isEditeur: undefined,
            image: undefined,
            typeImage: TypeImageEnumValue.MARQUE,
        };
    }

    return {
        id: marque.id,
        idFou: marque.idFou ? marque.idFou : undefined,
        marque: marque.marque,
        isEditeur:
            marque.isEditeur === null || marque.isEditeur === undefined
                ? undefined
                : (String(marque.isEditeur) as 'true' | 'false'),
        image: undefined,
        typeImage: TypeImageEnumValue.MARQUE,
    };
}

export function MarqueForm({ onSuccess, marque }: MarqueFormPropsType) {
    const [addMarque] = useAddImageMutation();
    const [updateMarque] = useUpdateImageMutation();

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<UpdateMarqueFormValidationType>({
        resolver: zodResolver(
            marque ? UpdateMarqueFormValidationSchema : NewMarqueFormValidationSchema,
        ) as Resolver<UpdateMarqueFormValidationType>,
        defaultValues: getDefaultValues(marque),
    });

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
            reset();
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
                    />
                    <InputField
                        error={errors.marque}
                        register={register('marque')}
                        fieldLabel="Nom de la marque"
                        placeholder=""
                    />
                    <SelectField
                        error={errors.isEditeur}
                        control={control}
                        name="isEditeur"
                        label="Est-ce un éditeur ?"
                        collection={isEditeurCollection}
                    />
                    <MediaField
                        mediaType={TypeMediaEnumValue.IMAGE}
                        error={errors.image}
                        control={control}
                        label={'Image de la marque'}
                        name="image"
                    />
                    <Button type="submit">{marque ? "Modifier l'image" : "Créer l'image"}</Button>
                </VStack>
            </form>
        </>
    );
}
