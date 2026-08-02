import { Button, Dialog, Portal, VStack } from "@chakra-ui/react";
import { useState } from "react";
import {type VideoSelectType } from "../../service/VideoService";

type ConfirmationSuppressionPropsType = {
    id: number,
    setVideos: React.Dispatch<React.SetStateAction<VideoSelectType[]>>
    supabaseDeleteAction: (id: number) => Promise<boolean>
}
export default function ConfirmationSuppression({id, setVideos, supabaseDeleteAction} : ConfirmationSuppressionPropsType) {
    const [isOpen, setIsOpen] = useState(false);


    function handleDelete() {
        supabaseDeleteAction(id).then((b) => {
            if (b) {
                setVideos((videos: VideoSelectType[]) => {
                    const newVideos = videos.filter((video) => video.id != id);
                    return newVideos;
                })
            }
        })
        setIsOpen(false);
    }
    return (
        <>

        <VStack align="center">
            <Dialog.Root
                open={isOpen}
                onOpenChange={(details) => setIsOpen(details.open)}
                placement="center"
            >
                <Dialog.Trigger asChild>
                    <Button colorPalette="red" onClick={() => setIsOpen(true)}>Supprimer</Button>
                </Dialog.Trigger>

                <Portal>
                    
                    <Dialog.Backdrop />
                    
                    <Dialog.Positioner>
                        <Dialog.Content bg="gray.800" maxW={{ base: "70vw", sm:"50vw", md: "50vw" }} minH={{ base: "30vh", sm:"50vh", md: "50vh" }}>
                            <Dialog.Body  display="flex" justifyContent="center" alignItems="center">
                                <Button colorPalette="red" onClick={() => handleDelete()}>Confirmer la suppression</Button>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                    
                </Portal>
            </Dialog.Root>
        </VStack>
            
            
        </>
    );
}