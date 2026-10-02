import { useForm } from 'react-hook-form';
import { useAddImageMutation } from '../../redux/features/images/ImageApi';
import {
    NewEditeurFormValidationSchema,
    type NewEditeurFormValidationType,
} from '../validation/NewEditeurFormValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TYPE_IMAGE_VALUE, type ImageCreate } from '../../types/ImageType';
import { Button, Field, Input, VStack } from '@chakra-ui/react';

export function NewEditeurForm() {
    const [addEditeur] = useAddImageMutation();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<NewEditeurFormValidationType>({
        resolver: zodResolver(NewEditeurFormValidationSchema),
        defaultValues: {
            marque: '',
            typeImage: TYPE_IMAGE_VALUE.EDITEUR,
        },
    });

    async function onSubmit(data: NewEditeurFormValidationType) {
        const image = await urlToFile('/image/editeur.png', 'editeur.png');
        const imageCreate: ImageCreate = {
            marque: data.marque,
            typeImage: data.typeImage,
            image: image,
        };
        addEditeur(imageCreate);
        reset();
    }

    async function urlToFile(url: string, filename: string): Promise<File> {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4} alignItems="center" justifyItems="center">
                    <Field.Root width="50%" textAlign="center" invalid={!!errors.marque}>
                        <Field.Label display="block" textAlign="center" width="100%">
                            Nom de l'éditeur
                        </Field.Label>
                        <Input
                            type="text"
                            placeholder="nom de l'éditeur"
                            textAlign="center"
                            caretColor="transparent"
                            {...register('marque')}
                        />
                        <Field.ErrorText>{errors.marque?.message}</Field.ErrorText>
                    </Field.Root>
                    <Button type="submit">Créer l'editeur</Button>
                </VStack>
            </form>
        </>
    );
}
