import { useEffect, useState } from "react"
import type { VideoCreateType, VideoSelectType } from "../../service/VideoService";
import { Button, Field, Input, Stack, Textarea, Text } from "@chakra-ui/react";
import type { FormPropsType } from "../modal/BoutonCreation";
import { ChargementStatut } from "../../enum/ChargementStatut";

type NewVideoFormPropType = {
    supabaseAction: (video: VideoCreateType) => Promise<VideoSelectType | null> ;
    submitMessage: string;
    resetMessage: string,
    onSuccess: (result : VideoSelectType | null) => void;  
    onReset: () => void;
    formProps : FormPropsType;
}

export default function NewVideoForm({supabaseAction, submitMessage, resetMessage, onSuccess, onReset, formProps} : NewVideoFormPropType) {

    const [submitMessageState, setSubmitMessageState] = useState(submitMessage);
    const [isLocked, setIsLocked] = useState(true)
    const {description, setDescription, age, setAge, video, setVideo, chargementStatut, setChargementStatut} = formProps;
    function handleVideo(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        if (e.target.files) {
            setVideo(e.target.files[0]);
        }
    }

    useEffect(() => {
        console.log(chargementStatut);
        if (chargementStatut === ChargementStatut.Inactif) {
            setSubmitMessageState(submitMessage);
            setIsLocked(false);
        } else if (chargementStatut === ChargementStatut.EnAttente) {
            setIsLocked(true);
            setSubmitMessageState("Chargement en cours, patientez.");
        } else if (chargementStatut === ChargementStatut.Terminee) {
            setIsLocked(true);
            setSubmitMessageState("Chargement terminée: " + resetMessage )
        }
    }, [chargementStatut])

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        if (!video) return;
        if (chargementStatut === ChargementStatut.EnAttente || chargementStatut === ChargementStatut.Terminee) return;
        const videoDescription = description;
        const videoAge = age;
        const videoBlob = video;
        setChargementStatut(ChargementStatut.EnAttente)
        try {
            const result = await supabaseAction({description: videoDescription, age: videoAge, video : videoBlob})
            onSuccess(result);
            setChargementStatut(ChargementStatut.Terminee)
        } catch (error) {
        console.error("Erreur pendant la création :", error);
        // Ici tu peux aussi afficher un message d'erreur à l'utilisateur
    }
        
    }

    function getSubmitButton() {
        if (chargementStatut === ChargementStatut.Inactif) {
            return (
            <>
                <Button type="submit">{submitMessageState}</Button>
                <Button onClick={() => onReset()}>Réinitialiser les données</Button>
            </>
            );
        } else if (chargementStatut === ChargementStatut.EnAttente) {
            return <Button disabled={true} >{submitMessageState}</Button>
        } else {
            return <Button onClick={() => onReset()} >{submitMessageState}</Button>
        }
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Stack gap={4}>
                    <Field.Root>
                        <Field.Label>description</Field.Label>
                        <Textarea 
                            id="description" 
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            disabled={isLocked}
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>age</Field.Label>
                        <Textarea
                            id="age" 
                            name="age"
                            onChange={(e) => setAge(e.target.value)}         
                            value={age}     
                            disabled={isLocked}              
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>vidéo</Field.Label>
                        
                        <Input
                            type="file" 
                            id="video"
                            accept="video/mp4,video/*"
                            onChange={handleVideo}
                            value=""
                            disabled={isLocked}
                        />
                        
                       
                        <Text fontSize="sm" color="gray.600" mt={1}>
                            {video ?    `Fichier sélectionné : ${video.name} (${(video.size / 1_000_000).toFixed(1)} Mo)`  : `Aucun fichier sélectionné`}
                        </Text>
                    
                            
                    
                    </Field.Root>

                    
                    {getSubmitButton()}
                </Stack>
            </form>
        </>
    )
}