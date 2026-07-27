import { Button, Dialog, Portal } from "@chakra-ui/react";
import NewVideoForm from "../card/NewVideoForm";
import { type VideoCreateType, type VideoSelectType } from "../../service/VideoService";
import { useState } from "react";
import type { ChargementStatutEnum } from "../../enum/ChargementStatut";
import { ChargementStatut } from "../../enum/ChargementStatut";

export type FormPropsType = {
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    age : string,
    setAge: React.Dispatch<React.SetStateAction<string>>,
    video: File | null,
    setVideo : React.Dispatch<React.SetStateAction<File | null>>
    chargementStatut: ChargementStatutEnum,
    setChargementStatut: React.Dispatch<React.SetStateAction<ChargementStatutEnum>>,
};

type BoutonCreationPropsType = {
    submitMessage : string;
    resetMessage : string;
    setVideos: React.Dispatch<React.SetStateAction<VideoSelectType[]>>;
    supabaseAction: (video : VideoCreateType) => Promise<VideoSelectType | null>;
    onSuccess: (result: VideoSelectType | null) => void;
}
export default function BoutonCreation({submitMessage, resetMessage, supabaseAction, onSuccess}: BoutonCreationPropsType) {
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");
    const [video, setVideo] = useState<File | null>(null);
    const [chargementStatut, setChargementStatut] = useState<ChargementStatutEnum>(ChargementStatut.Inactif)


    function onReset() {
        setDescription("");
        setAge("");
        setVideo(null);
        setChargementStatut(ChargementStatut.Inactif);
    }

    const formProps : FormPropsType =  {
        description,
        setDescription,
        age,
        setAge,
        video,
        setVideo,
        chargementStatut,
        setChargementStatut
    };
    return (
        <>
            <Dialog.Root 
                size={{base: "xs"}}
                open={isOpen}
                onOpenChange={(details) => {
                    if(details.open) setIsOpen(true);
                    else {
                        setIsOpen(false); 
                        if (ChargementStatut.Terminee === chargementStatut) onReset();
                    }
                }}
            >
                <Dialog.Trigger asChild>
                    <Button onClick={() => setIsOpen(true)} colorPalette="blue" size={{ base: "lg", sm: "xl", md: "2xl" }} my={{ base: 4, sm: 6, md: 10 }}>{submitMessage}</Button> 
                </Dialog.Trigger>
           
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content maxW={{ base: "70vw", sm:"50vw", md: "50vw" }}>
                            <Dialog.Body>
                                <NewVideoForm onReset={onReset} supabaseAction={supabaseAction} submitMessage={submitMessage} resetMessage={resetMessage} onSuccess={onSuccess} formProps={formProps}/>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>           
            </Dialog.Root>
        </>
    );
}