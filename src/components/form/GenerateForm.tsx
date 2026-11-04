import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenerateFormValidationSchema, type GenerateFormValidationType } from "../validation/form/GenerateFormValidation";
import { Box, Button, VStack } from "@chakra-ui/react";
import InputField from "./fields/InputField";
import { ArrayField } from "./fields/ArrayField";
import TextAreaField from "./fields/TextAreaField";
import { type TypeImageEnum } from "../../enum/TypeImageEnum";


type GenerateFormPropsType = {
    onSubmit: (prompt: string) => void;
    typeImage: TypeImageEnum; 
    locked?: boolean
}

export function GenerateForm({onSubmit: createGenerate, locked, typeImage}: GenerateFormPropsType) {

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

    function buildPrompt(data: GenerateFormValidationType): string {
        let prompt = `Je veux une image représentant un(e) ${typeImage} 
        pour l'exposer sur un site de e-commerce dans la section nos ${typeImage}. ` 
        const typeProduit = 'Le/La ' + typeImage.toLowerCase();
        if (data.designation) {
            prompt += `${typeProduit} a la désignation suivant ${data.designation}. `
        }
        if (data.multicodes.length > 0) {
            const multicodes = data.multicodes.map(multicode => multicode.value).join(" ")
            prompt += `${typeProduit} a possède les codes barres suivant ${multicodes}. `
        }
        if (data.commentaire) {
            prompt += `Voici mes commentaires sur le produit: ${data.commentaire}`
        }
        return prompt;
    }
    
    function onSubmit(data: GenerateFormValidationType) {
        createGenerate(buildPrompt(data));
    }
    return (
    <> 
        <Box>
            <VStack gap={4} alignItems="center" justifyItems="center">
                <InputField error={errors.designation} register={register('designation')} fieldLabel={"Désignation de l'article"} locked={locked}/>
                <ArrayField
                    fieldArray={fieldArray}
                    fieldName="multicodes"
                    register={register}
                    errors={errors}
                    fieldLabel="Multicode"
                    appendMessage="Ajouter un multicode"
                    removeMessage="Supprimer le multicode"
                    locked={locked}
                />
                <TextAreaField error={errors.commentaire} register={register('commentaire')} label="Ajouter un commentaire" locked={locked}/>
                <Button type="button" onClick={handleSubmit(onSubmit)} disabled={locked}>{"Lancer l'autocomplétion des champs"}</Button>
            </VStack>
        </Box>
    </>
    )

}