import { Field, Textarea } from '@chakra-ui/react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TextareaPropsType = {
    error: FieldError | undefined;
    register: UseFormRegisterReturn;
    label: string;
    locked?: boolean;
};

export default function TextAreaField({ error, register, label, locked }: TextareaPropsType) {
    return (
        <Field.Root width="50%" invalid={!!error} readOnly={locked}>
            <Field.Label>{label}</Field.Label>
            <Textarea {...register} color="black" />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
