import { Box, Button, Field, FileUpload, Icon, Input, VStack } from '@chakra-ui/react';
import { LuUpload } from 'react-icons/lu';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import {
    NewPelucheFormValidationSchema,
    type NewPelucheFormValidationType,
} from '../validation/NewPelucheFormValidation';
import { useAddImageMutation } from '../../redux/features/images/ImageApi';

export function NewPelucheForm() {
    const [addPeluche] = useAddImageMutation();

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<NewPelucheFormValidationType>({
        resolver: zodResolver(NewPelucheFormValidationSchema),
        defaultValues: {
            marque: '',
            typeImage: 'PELUCHE',
        },
    });

    function onSubmit(data: NewPelucheFormValidationType) {
        console.log('clique effectué');
        console.log(data.image.name);
        console.log(data.image);
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
                        <Input
                            type="text"
                            placeholder="Marque de la peluche"
                            textAlign="center"
                            caretColor="transparent"
                            {...register('marque')}
                        />
                        <Field.ErrorText>{errors.marque?.message}</Field.ErrorText>
                    </Field.Root>
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
