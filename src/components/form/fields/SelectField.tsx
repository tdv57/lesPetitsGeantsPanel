import { Field, Select, type ListCollection } from '@chakra-ui/react';
import {
    Controller,
    type Control,
    type FieldError,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

type SelectFieldPropsType<T extends FieldValues> = {
    error: FieldError | undefined;
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    collection: ListCollection;
    locked?: boolean;
};

export default function SelectField<T extends FieldValues>({
    error,
    control,
    name,
    label,
    collection,
    locked = false,
}: SelectFieldPropsType<T>) {
    return (
        <Field.Root width="50%" invalid={!!error} readOnly={locked}>
            <Field.Label>{label}</Field.Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select.Root
                        collection={collection}
                        color="black"
                        value={field.value ? [field.value] : []}
                        onValueChange={(details) => field.onChange(details.value[0])}
                        onInteractOutside={field.onBlur}
                    >
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder=" " />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>

                        <Select.Positioner>
                            <Select.Content>
                                {collection.items.map((item) => (
                                    <Select.Item key={item.value} item={item}>
                                        {item.label}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Select.Root>
                )}
            />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    );
}
