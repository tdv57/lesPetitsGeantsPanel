import {
    Box,
    Button,
    createListCollection,
    Field,
    FileUpload,
    Icon,
    Input,
    Select,
    VStack,
} from '@chakra-ui/react';
import { LuUpload } from 'react-icons/lu';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import {
    CUSTOM_BRAND,
    NewPelucheFormValidationSchema,
    type NewPelucheFormValidationType,
} from '../validation/NewPelucheFormValidation';
import { useAddImageMutation, useGetImageByTypeQuery } from '../../redux/features/images/ImageApi';
import { TYPE_IMAGE_VALUE } from '../../types/ImageType';
import { useEffect, useMemo } from 'react';

export function NewPelucheForm() {
    const [addPeluche] = useAddImageMutation();

    const { data: marques = [] } = useGetImageByTypeQuery(TYPE_IMAGE_VALUE.MARQUE);

    const {
        control,
        handleSubmit,
        register,
        reset,
        watch,
        setFocus,
        formState: { errors },
    } = useForm<NewPelucheFormValidationType>({
        resolver: zodResolver(NewPelucheFormValidationSchema),
        defaultValues: {
            marque: '',
            typeImage: 'PELUCHE',
        },
    });

    const marqueCollection = useMemo(
        () =>
            createListCollection({
                items: [
                    { label: 'MARQUE PERSONNALISÉE', value: CUSTOM_BRAND },
                    ...marques.map((m) => ({ label: m.marque, value: m.marque })),
                ],
            }),
        [marques],
    );

    const marqueId = watch('marque');
    const isCustom = marqueId === CUSTOM_BRAND;

    useEffect(() => {
        if (isCustom) setFocus('marquePersonnalise');
    }, [isCustom, setFocus]);

    function onSubmit(data: NewPelucheFormValidationType) {
        if (data.marque === CUSTOM_BRAND) {
            data.marque = '[PERSO]-' + data.marquePersonnalise;
        }
        addPeluche(data);
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4} alignItems="center" justifyItems="center">
                    <Field.Root width="50%" textAlign="center" invalid={!!errors.marque}>
                        <Field.Label display="block" textAlign="center" width="100%">
                            Marque de la peluche
                        </Field.Label>
                        <Controller
                            name="marque"
                            control={control}
                            render={({ field }) => (
                                <Select.Root
                                    collection={marqueCollection}
                                    value={field.value ? [field.value] : []}
                                    onValueChange={(details) => {
                                        const next = details.value[0];
                                        field.onChange(next);
                                    }}
                                    onInteractOutside={field.onBlur}
                                >
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="--" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            {field.value && <Select.ClearTrigger />}
                                        </Select.IndicatorGroup>
                                    </Select.Control>

                                    <Select.Positioner>
                                        <Select.Content>
                                            {marqueCollection.items.map((item) => (
                                                <Select.Item key={item.value} item={item}>
                                                    {item.label}
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Select.Root>
                            )}
                        />
                        <Field.ErrorText>{errors.marque?.message}</Field.ErrorText>
                    </Field.Root>
                    {isCustom && (
                        <Field.Root width="50%" invalid={!!errors.marquePersonnalise} mt={3}>
                            <Field.Label>Nom de la marque personnalisée</Field.Label>
                            <Input
                                type="text"
                                placeholder="Nom de la marque"
                                textAlign="center"
                                {...register('marquePersonnalise')}
                            />
                            <Field.ErrorText>{errors.marquePersonnalise?.message}</Field.ErrorText>
                        </Field.Root>
                    )}
                    <Field.Root
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        invalid={!!errors.image}
                    >
                        <Field.Label mx="auto">Image de la peluche</Field.Label>
                        <Controller
                            control={control}
                            name="image"
                            render={({ field }) => (
                                <FileUpload.Root
                                    width="50%"
                                    accept={['image/png', 'image/jpeg', 'image/webp']}
                                    maxFiles={1}
                                    onFileChange={(details) => {
                                        const file = details.acceptedFiles[0];
                                        field.onChange(file);
                                    }}
                                >
                                    <FileUpload.HiddenInput />

                                    <FileUpload.Dropzone
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            width: '100%',
                                        }}
                                    >
                                        <Icon size="md" color="fg.muted">
                                            <LuUpload />
                                        </Icon>
                                        <FileUpload.DropzoneContent>
                                            {field.value ? (
                                                <>
                                                    <Box>Image: {field.value.name}</Box>
                                                    <Box>
                                                        Taille:{' '}
                                                        {(field.value.size / 1024).toFixed(2)} Ko
                                                    </Box>
                                                </>
                                            ) : (
                                                <>
                                                    <Box>
                                                        Glisse une image ici ou clique pour
                                                        parcourir
                                                    </Box>
                                                    <Box>PNG, JPG, WEBP jusqu'à 5MO</Box>
                                                </>
                                            )}
                                        </FileUpload.DropzoneContent>
                                    </FileUpload.Dropzone>
                                </FileUpload.Root>
                            )}
                        />
                        <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
                    </Field.Root>
                    <Button type="submit">Créer l'image</Button>
                </VStack>
            </form>
        </>
    );
}
