import { Controller, useForm } from "react-hook-form";
import { NewJouetFormValidationSchema, type NewJouetFormValidationType } from "../validation/NewJouetFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Field, FileUpload, Icon, NumberInput, Select, Textarea, VStack } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { typeAgeCollection } from "../../mapper/UtilsMapper";
import { useAddImageMutation } from "../../redux/features/images/ImageApi";

export function NewJouetForm() {

    const [addJouet] = useAddImageMutation();

    const {
        control, 
        handleSubmit, 
        register, 
        reset, 
        formState: {errors}
    } = useForm<NewJouetFormValidationType>({
        resolver: zodResolver(NewJouetFormValidationSchema),
        defaultValues: {
            age: "",
            typeAge: "",
            description: "",
            typeImage: "JOUET"
        }
    });

    function onSubmit(data: NewJouetFormValidationType) {
        addJouet(data);
        reset();
    }


    return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4} alignItems="center" justifyItems="center">
                <Field.Root  invalid={!!errors.description}>
                    <Field.Label>Description</Field.Label>
                    <Textarea
                    {... register("description")}
                    color="black"
                    />
                    <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                </Field.Root>
                
                <Field.Root invalid={!!errors.age}>
                    <Field.Label>age</Field.Label>
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                            <NumberInput.Root
                                value={field.value}
                                onValueChange={(details) => field.onChange(details.value)}
                                min={1}      
                                max={100} 
                                color="black"   
                            >
                            <NumberInput.Control/>
                            <NumberInput.Input 
                                id="age" 
                                name="age"
                                onBlur={field.onBlur}
                            />
                            </NumberInput.Root>
                        )} />
                   
                    <Field.ErrorText>{errors.age?.message}</Field.ErrorText>
                </Field.Root>
            
                <Field.Root invalid={!!errors.typeAge}>
                    <Field.Label>type d'âge</Field.Label>
                    <Controller
                        name="typeAge"
                        control={control}
                        render={({ field }) => (
                            <Select.Root
                                collection={typeAgeCollection}
                                color="black"
                                value={field.value ? [field.value] : []}
                                onValueChange={(details) => field.onChange(details.value[0])}
                                onInteractOutside={field.onBlur}
                            >
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="--" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>

                                <Select.Positioner>
                                    <Select.Content>
                                        {typeAgeCollection.items.map((item) => (
                                            <Select.Item key={item.value} item={item}>
                                                {item.label}
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Select.Root>
                        )}
                    />
                    <Field.ErrorText>{errors.typeAge?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root  width="100%" display="flex" flexDirection="column" alignItems="center" invalid={!!errors.image}>
                    <Field.Label mx="auto" >Image du Jouet</Field.Label>
                    <Controller 
                        name="image"
                        control={control}
                        render={({field}) => (
                            <FileUpload.Root
                                width="50%"
                                accept={["image/png", "image/jpeg", "image/webp"]}
                                maxFiles={1}
                                onFileChange={(details) => {
                                    const file = details.acceptedFiles[0];
                                    field.onChange(file)
                                }}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Dropzone
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        width: "100%"
                                    }}
                                >
                                    <Icon size="md" color="fg.muted">
                                    <LuUpload/>  
                                    </Icon>
                                    <FileUpload.DropzoneContent>
                                        { field.value ?  
                                        <>
                                            <Box>Image: {field.value.name}</Box>
                                            <Box>Taille: {(field.value.size / 1024).toFixed(2)} Ko</Box>                          
                                        </>

                                            :
                                            <>
                                                <Box>Glisse une image ici ou clique pour parcourir</Box>
                                                <Box>PNG, JPG, WEBP jusqu'à 5MO</Box>
                                            </>

                                    }

                                    </FileUpload.DropzoneContent>
                                </FileUpload.Dropzone> 

                            </FileUpload.Root>
                        )} />
                    <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
                </Field.Root>
                <Button type="submit">Créer l'image</Button>
            </VStack>
        </form>
    </>
    );
}