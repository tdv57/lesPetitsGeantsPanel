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
} from '../validation/DeguisementFormValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemeEnumValue } from '../../enum/ThemeEnum';
import { createListCollection } from '@ark-ui/react/select';
import { GenreEnumValue } from '../../enum/GenreEnum';
import { Button, VStack } from '@chakra-ui/react';
import { typeAgeCollection } from '../../mapper/AgeMapper';
import { TypeImageEnumValue } from '../../enum/TypeImageEnum';
import TextAreaField from './fields/TextAreaField';
import NumberField from './fields/NumberField';
import SelectField from './fields/SelectField';
import InputField from './fields/InputField';
import { CUSTOM_BRAND } from '../validation/ArticleFormValidationBase';
import { useMemo } from 'react';
import ImageField from './fields/ImageField';
import type { ImageSelect } from '../../types/ImageType';

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

function getDefaultValues(deguisement?: ImageSelect) {
    if (!deguisement) {
        return {
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

    const { data: marques } = useGetImageByTypeQuery(TypeImageEnumValue.MARQUE);
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
        reset,
        watch,
        formState: { errors },
    } = useForm<UpdateDeguisementFormValidationType>({
        resolver: zodResolver(
            deguisement
                ? UpdateDeguisementFormValidationSchema
                : NewDeguisementFormValidationSchema,
        ) as Resolver<UpdateDeguisementFormValidationType>,
        defaultValues: getDefaultValues(deguisement),
    });

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
            reset();
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
                    />
                    <TextAreaField
                        error={errors.description}
                        register={register('description')}
                        label="Description"
                    />
                    <SelectField
                        error={errors.genre}
                        control={control}
                        name={'genre'}
                        label="Genre"
                        collection={genreCollection}
                    />
                    <SelectField
                        error={errors.theme}
                        control={control}
                        name={'theme'}
                        label="Thème"
                        collection={themeCollection}
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
                    <ImageField
                        error={errors.image}
                        label="Ajouter une image"
                        name="image"
                        control={control}
                    />
                    <Button type="submit">
                        {deguisement ? "Modifier l'image" : "Créer l'image"}
                    </Button>
                </VStack>
            </form>
        </>
    );
}
