import { Box, Field, FileUpload, Icon } from '@chakra-ui/react';
import {
    Controller,
    type Control,
    type FieldError,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { LuUpload } from 'react-icons/lu';
import { TypeMediaEnumValue, type TypeMediaEnum } from '../../../enum/TypeMediaEnum';

type MediaFieldPropsType<T extends FieldValues> = {
    error: FieldError | undefined;
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    mediaType: TypeMediaEnum;
    locked?: boolean;
};

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

const IMAGE_HINTS = {
    mediaNameMaj: 'Image',
    mediaNameMin: 'image',
    hint: "PNG, JPG, WEBP jusqu'à 5MO",
    unit: 'Ko',
};
const VIDEO_HINTS = {
    mediaNameMaj: 'Vidéo',
    mediaNameMin: 'vidéo',
    hint: "MP4, WEBM, QUICKTIME jusqu'à 300 Mo",
    unit: 'Mo',
};

export default function MediaField<T extends FieldValues>({
    error,
    label,
    name,
    control,
    mediaType,
    locked = false,
}: MediaFieldPropsType<T>) {
    const TYPES = mediaType === TypeMediaEnumValue.IMAGE ? IMAGE_TYPES : VIDEO_TYPES;
    const HINTS = mediaType === TypeMediaEnumValue.IMAGE ? IMAGE_HINTS : VIDEO_HINTS;

    return (
        <Field.Root
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            invalid={!!error}
            readOnly={locked}
        >
            <Field.Label mx="auto">{label}</Field.Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <FileUpload.Root
                        width="50%"
                        accept={TYPES}
                        maxFiles={1}
                        onFileChange={(details) => {
                            const file = details.acceptedFiles[0];
                            field.onChange(file);
                        }}
                        disabled={locked}
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
                                        <Box>
                                            {HINTS.mediaNameMaj}: {field.value.name}
                                        </Box>
                                        <Box>
                                            Taille:{' '}
                                            {mediaType === TypeMediaEnumValue.IMAGE
                                                ? (field.value.size / 1024).toFixed(2)
                                                : (field.value.size / 1_000_000).toFixed(1)}{' '}
                                            {HINTS.unit}
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Box>
                                            Glisse une {HINTS.mediaNameMin} ici ou clique pour
                                            parcourir
                                        </Box>
                                        <Box>{HINTS.hint}</Box>
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
