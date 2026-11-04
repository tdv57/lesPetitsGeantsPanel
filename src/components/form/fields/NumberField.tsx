import { Field, NumberInput } from '@chakra-ui/react';
import {
    Controller,
    type Control,
    type FieldError,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

type NumberFieldPropsType<T extends FieldValues> = {
    error: FieldError | undefined;
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    locked?: boolean;
};

export default function NumberField<T extends FieldValues>({
    error,
    control,
    name,
    label,
    locked = false,
}: NumberFieldPropsType<T>) {
    return (
        <Field.Root width="50%" invalid={!!error} readOnly={locked}>
            <Field.Label>{label}</Field.Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <NumberInput.Root
                        value={field.value === null || Number.isNaN(field.value) ? '' : String(field.value)}
                        onValueChange={(details) => field.onChange(Number.isNaN(details.valueAsNumber) ? null : details.valueAsNumber)}
                        color="black"
                    >
                        <NumberInput.Control />
                        <NumberInput.Input name={name} onBlur={field.onBlur} />
                    </NumberInput.Root>
                )}
            />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
