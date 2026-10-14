import { Field, Textarea } from '@chakra-ui/react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TextareaPropsType = {
    error: FieldError | undefined;
    register: UseFormRegisterReturn;
    label: string;
};

export default function TextAreaField({ error, register, label }: TextareaPropsType) {
    return (
        <Field.Root width="50%" invalid={!!error}>
            <Field.Label>{label}</Field.Label>
            <Textarea {...register} color="black" />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
