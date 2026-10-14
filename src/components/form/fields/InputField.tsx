import { Field, Input } from '@chakra-ui/react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

type InputFieldPropsType = {
    error: FieldError | undefined;
    register: UseFormRegisterReturn;
    fieldLabel: string;
    placeholder?: string;
};

export default function InputField({
    error,
    register,
    fieldLabel,
    placeholder,
}: InputFieldPropsType) {
    return (
        <Field.Root width="50%" invalid={!!error} mt={3}>
            <Field.Label>{fieldLabel}</Field.Label>
            <Input
                type="text"
                placeholder={placeholder ? placeholder : ''}
                textAlign="center"
                {...register}
            />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
