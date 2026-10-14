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
};

export default function NumberField<T extends FieldValues>({
    error,
    control,
    name,
    label,
}: NumberFieldPropsType<T>) {
    return (
        <Field.Root width="50%" invalid={!!error}>
            <Field.Label>{label}</Field.Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <NumberInput.Root
                        value={String(field.value)}
                        onValueChange={(details) => field.onChange(details.valueAsNumber)}
                        color="black"
                    >
                        <NumberInput.Control />
                        <NumberInput.Input id={name} name={name} onBlur={field.onBlur} />
                    </NumberInput.Root>
                )}
            />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
