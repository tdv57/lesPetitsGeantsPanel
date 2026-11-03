import { Field, Input } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

type InputFieldPropsType = {
    error: FieldError | undefined;
    register: UseFormRegisterReturn;
    fieldLabel: string;
    placeholder?: string;
    locked?: boolean;
};

export default function InputNumericField({
    error,
    register,
    fieldLabel,
    placeholder,
    locked = false,
}: InputFieldPropsType) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        register.onChange(e);
    };
    
    return (
        <Field.Root width="50%" invalid={!!error} mt={3} readOnly={locked}>
            <Field.Label>{fieldLabel}</Field.Label>
            <Input
                type="text"
                placeholder={placeholder ? placeholder : ''}
                pattern="[0-9]*"
                textAlign="center"
                {...register}
                onChange={handleChange}
            />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
