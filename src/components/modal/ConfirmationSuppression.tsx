import { Button, Dialog, Portal, VStack } from "@chakra-ui/react";
import { useState } from "react";

type ConfirmationSuppressionPropsType = {
    id: number,
    handleDelete: (id : number)=> void
}
export default function ConfirmationSuppression({id, handleDelete} : ConfirmationSuppressionPropsType) {
    const [isOpen, setIsOpen] = useState(false);


    function onDelete() {
        handleDelete(id);
        setIsOpen(false);
    }
    return (
        <>

        <VStack align="center" margin="8px">
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
                                <Button colorPalette="red" onClick={() => onDelete()}>Confirmer la suppression</Button>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                    
                </Portal>
            </Dialog.Root>
        </VStack>
            
            
        </>
    );
}