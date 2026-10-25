import { Field, Input } from '@chakra-ui/react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

type InputFieldPropsType = {
    error: FieldError | undefined;
    register: UseFormRegisterReturn;
    fieldLabel: string;
    placeholder?: string;
    locked?: boolean;
};

export default function UrlField({
    error,
    register,
    fieldLabel,
    placeholder,
    locked = false,
}: InputFieldPropsType) {
    return (
        <Field.Root width="50%" invalid={!!error} mt={3} readOnly={locked}>
            <Field.Label>{fieldLabel}</Field.Label>
            <Input
                type="url"
                placeholder={placeholder ? placeholder : ''}
                textAlign="center"
                {...register}
            />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
