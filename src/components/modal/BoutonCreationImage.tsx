import { Box, Button, Dialog, Portal } from "@chakra-ui/react";
import type { TYPE_IMAGE } from "../../service/ImageService";
import { useState, type JSX } from "react";

type BoutonCreationImagePropsType = {
    typeImageLabel : TYPE_IMAGE,
    typeImageValue : "Marque" | "Jouet" | "Jeu de société" | "Peluche"
}



export function BoutonCreationImage({typeImageLabel, typeImageValue} : BoutonCreationImagePropsType) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function getForm(t: TYPE_IMAGE) :  JSX.Element {
        switch(t) {
            case "MARQUE":
                return <Box>Marque</Box>;
            case "JOUET":
                return <Box>Jouet</Box>;
            case "JEU DE SOCIETE":
                return <Box>Jeu de société</Box>;
            case "PELUCHE":
                return <Box>Peluche</Box>;
        }
    }
    return(
        <>
            <Dialog.Root
                open={isOpen}
                onOpenChange={(value) => setIsOpen(value.open)}
            >
                <Dialog.Trigger asChild>
                    <Button colorPalette="blue" size={{ base: "lg", sm: "xl", md: "2xl" }} my={{ base: 4, sm: 6, md: 10 }}>{`Ajouter un(e) ` + typeImageValue}</Button>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content maxW={{ base: "70vw", sm:"50vw", md: "50vw" }}>
                            <Dialog.Body color="black">
                                {getForm(typeImageLabel)}
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>

            </Dialog.Root>
        </>
    );
}