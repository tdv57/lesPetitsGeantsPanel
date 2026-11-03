import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import type { ArrayPath, FieldError, FieldErrors, FieldValues, Path, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import { get } from "react-hook-form";
import InputNumericField from "./InputNumericField";
import { LuPlus, LuTrash2 } from "react-icons/lu";


type ArrayFieldPropsType<
    TFieldValues extends FieldValues,
    TName extends ArrayPath<TFieldValues>
> = {
    fieldArray: Pick<
        UseFieldArrayReturn<TFieldValues, TName>,
        "fields" | "append" | "remove"
    >;
    locked?: boolean;
    fieldLabel: string;
    errors?: FieldErrors<TFieldValues>
    register: UseFormRegister<TFieldValues>;
    fieldName: TName;
    appendMessage: string,
    removeMessage: string,
}

export function ArrayField<
        TFieldValues extends FieldValues,
        TName extends ArrayPath<TFieldValues>
    >({fieldArray, locked = false, fieldLabel, errors, register, appendMessage, removeMessage, fieldName}: ArrayFieldPropsType<TFieldValues, TName>) {
    const { fields, append, remove } = fieldArray;

    return (
    <>
        {fields.map((field, index) => (
            <HStack key={field.id} align="flex-end">
                <InputNumericField
                    fieldLabel={`${fieldLabel} ${index + 1}`}
                    error={get(errors, `${fieldName}.${index}.value`) as FieldError | undefined }
                    register={register(`${fieldName}.${index}.value` as Path<TFieldValues>)}
                    locked={locked}
                />
                <IconButton
                    aria-label={removeMessage}
                    variant="outline"
                    colorPalette="red"
                    onClick={() => remove(index)}
                >
                    <LuTrash2 />
                </IconButton>
            </HStack>
        ))}

        <Box>
            <Button variant="outline" onClick={() => append({ value: '' } as any)}>
                <LuPlus /> {appendMessage}
            </Button>
        </Box>
    </>
    )

}