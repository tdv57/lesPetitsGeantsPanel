import { Controller, useForm } from 'react-hook-form';
import { useAddImageMutation, useGetImageByTypeQuery } from '../../redux/features/images/ImageApi';
import {
    CUSTOM_EDITOR,
    NewLivreFormValidationSchema,
    type NewLivreFormValidationType,
} from '../validation/NewLivreFormValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TYPE_IMAGE_VALUE, type ImageCreate } from '../../types/ImageType';
import {
    Box,
    Button,
    createListCollection,
    Field,
    FileUpload,
    Icon,
    Input,
    NumberInput,
    Select,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { typeAgeCollection } from '../../mapper/UtilsMapper';
import { LuUpload } from 'react-icons/lu';
import { useEffect, useMemo } from 'react';

export function NewLivreForm() {
    const [addLivre] = useAddImageMutation();

    const { data: editeurs = [] } = useGetImageByTypeQuery(TYPE_IMAGE_VALUE.EDITEUR);

    const {
        control,
        handleSubmit,
        register,
        reset,
        watch,
        setFocus,
        formState: { errors },
    } = useForm<NewLivreFormValidationType>({
        resolver: zodResolver(NewLivreFormValidationSchema),
        defaultValues: {
            description: '',
            age: '',
            typeAge: '',
            editeur: '',
            editeurPersonnalise: '',
            typeImage: TYPE_IMAGE_VALUE.LIVRE,
        },
    });

    const editeurCollection = useMemo(
        () =>
            createListCollection({
                items: [
                    { label: 'EDITEUR PERSONNALISÉ', value: CUSTOM_EDITOR },
                    ...editeurs.map((m) => ({ label: m.marque, value: m.marque })),
                ],
            }),
        [editeurs],
    );

    const editorId = watch('editeur');
    const isCustom = editorId === CUSTOM_EDITOR;

    useEffect(() => {
        if (isCustom) setFocus('editeurPersonnalise');
    }, [isCustom, setFocus]);

    function onSubmit(data: NewLivreFormValidationType) {
        const newImage: ImageCreate = {
            typeImage: data.typeImage,
            marque:
                data.editeur === CUSTOM_EDITOR
                    ? '[PERSO]-' + data.editeurPersonnalise
                    : data.editeur,
            typeAge: data.typeAge,
            age: data.age,
            description: data.description,
            image: data.image,
        };
        addLivre(newImage);
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4} alignItems="center" justifyItems="center">
                    <Field.Root invalid={!!errors.description}>
                        <Field.Label>Description</Field.Label>
                        <Textarea {...register('description')} color="black" />
                        <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.age}>
                        <Field.Label>âge</Field.Label>
                        <Controller
                            name="age"
                            control={control}
                            render={({ field }) => (
                                <NumberInput.Root
                                    value={field.value}
                                    onValueChange={(details) => field.onChange(details.value)}
                                    min={1}
                                    max={100}
                                    color="black"
                                >
                                    <NumberInput.Control />
                                    <NumberInput.Input id="age" name="age" onBlur={field.onBlur} />
                                </NumberInput.Root>
                            )}
                        />
                        <Field.ErrorText>{errors.age?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.typeAge}>
                        <Field.Label>type d'âge</Field.Label>
                        <Controller
                            name="typeAge"
                            control={control}
                            render={({ field }) => (
                                <Select.Root
                                    collection={typeAgeCollection}
                                    color="black"
                                    value={field.value ? [field.value] : []}
                                    onValueChange={(details) => field.onChange(details.value[0])}
                                    onInteractOutside={field.onBlur}
                                >
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="--" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>

                                    <Select.Positioner>
                                        <Select.Content>
                                            {typeAgeCollection.items.map((item) => (
                                                <Select.Item key={item.value} item={item}>
                                                    {item.label}
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Select.Root>
                            )}
                        />
                        <Field.ErrorText>{errors.typeAge?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root width="50%" textAlign="center" invalid={!!errors.editeur}>
                        <Field.Label display="block" textAlign="center" width="100%">
                            Editeur du livre
                        </Field.Label>
                        <Controller
                            name="editeur"
                            control={control}
                            render={({ field }) => (
                                <Select.Root
                                    collection={editeurCollection}
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
                                            {editeurCollection.items.map((item) => (
                                                <Select.Item key={item.value} item={item}>
                                                    {item.label}
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Select.Root>
                            )}
                        />
                        <Field.ErrorText>{errors.editeur?.message}</Field.ErrorText>
                    </Field.Root>
                    {isCustom && (
                        <Field.Root width="50%" invalid={!!errors.editeurPersonnalise} mt={3}>
                            <Field.Label>Nom de l'éditeur personnalisé</Field.Label>
                            <Input
                                type="text"
                                placeholder="Nom de l\'éditeur"
                                textAlign="center"
                                {...register('editeurPersonnalise')}
                            />
                            <Field.ErrorText>{errors.editeurPersonnalise?.message}</Field.ErrorText>
                        </Field.Root>
                    )}

                    <Field.Root
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        invalid={!!errors.image}
                    >
                        <Field.Label mx="auto">Image du livre</Field.Label>
                        <Controller
                            name="image"
                            control={control}
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
