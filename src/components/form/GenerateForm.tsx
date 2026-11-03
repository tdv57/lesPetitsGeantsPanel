import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenerateFormValidationSchema, type GenerateFormValidationType } from "../validation/form/GenerateFormValidation";
import { VStack } from "@chakra-ui/react";
import InputField from "./fields/InputField";
import { ArrayField } from "./fields/ArrayField";
import TextAreaField from "./fields/TextAreaField";

export function GenerateForm() {

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<GenerateFormValidationType>({
        resolver: zodResolver(
            GenerateFormValidationSchema
        ),
    });

    const fieldArray = useFieldArray({
        control,
        name: 'multicodes',
    });
    
    function onSubmit() {

    }
    return (
    <> 
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4} alignItems="center" justifyItems="center">
                <InputField error={errors.designation} register={register('designation')} fieldLabel={"Désignation de l'article"}/>
                <ArrayField
                    fieldArray={fieldArray}
                    fieldName="multicodes"
                    register={register}
                    errors={errors}
                    fieldLabel="Multicode"
                    appendMessage="Ajouter un multicode"
                    removeMessage="Supprimer le multicode"
                />
                <TextAreaField error={errors.commentaire} register={register('commentaire')} label="Ajouter un commentaire"/>
            </VStack>
        </form>
    </>
    )

}