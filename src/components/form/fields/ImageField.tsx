import { Box, Field, FileUpload, Icon } from '@chakra-ui/react';
import {
    Controller,
    type Control,
    type FieldError,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { LuUpload } from 'react-icons/lu';

type ImageFieldPropsType<T extends FieldValues> = {
    error: FieldError | undefined;
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
};

export default function ImageField<T extends FieldValues>({
    error,
    label,
    name,
    control,
}: ImageFieldPropsType<T>) {
    return (
        <Field.Root
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            invalid={!!error}
        >
            <Field.Label mx="auto">{label}</Field.Label>
            <Controller
                name={name}
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
                                        <Box>Taille: {(field.value.size / 1024).toFixed(2)} Ko</Box>
                                    </>
                                ) : (
                                    <>
                                        <Box>Glisse une image ici ou clique pour parcourir</Box>
                                        <Box>PNG, JPG, WEBP jusqu'à 5MO</Box>
                                    </>
                                )}
                            </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                    </FileUpload.Root>
                )}
            />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
