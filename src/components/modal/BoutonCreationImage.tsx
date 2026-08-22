import { Box, Button, Dialog, Portal } from "@chakra-ui/react";
import type { JeuDeSocieteSelect, JouetSelect, PelucheSelect, TYPE_IMAGE_TYPE } from "../../types/ImageType";
import { useState, type JSX } from "react";
import { NewMarqueForm } from "../form/NewMarqueForm";
import { useImages } from "../../hook/useImages";
import type { MarqueSelect } from "../../types/ImageType";
import { NewJouetForm } from "../form/NewJouetForm";
import { mapAge } from "../../mapper/UtilsMapper";
import { NewJouetDeSocieteForm } from "../form/NewJeuDeSocieteForm";
import { NewPelucheForm } from "../form/NewPelucheForm";

type BoutonCreationImagePropsType = {
    typeImageLabel : TYPE_IMAGE_TYPE,
    typeImageValue : "Marque" | "Jouet" | "Jeu de société" | "Peluche"
}



export function BoutonCreationImage({typeImageLabel, typeImageValue} : BoutonCreationImagePropsType) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {setImages} = useImages();

    function onSuccessMarque(result : MarqueSelect | null) {
        if(result) {
            setImages((m) => ({
            ...m,
            MARQUE: [...m.MARQUE, result],
            }))
        }
    }

    function onSuccessJouet(result : JouetSelect | null) {
        console.log("OnSuccessJouet: " + result);
        console.log(result);
        if(result) {
            setImages((m) => ({
            ...m,
            JOUET: [...m.JOUET, result],
            }))
        }
    }

    function onSuccessJeuDeSociete(result : JeuDeSocieteSelect | null) {
        console.log("onSuccessJeuDeSociete: " + result);
        console.log(result);
        if(result) {
            setImages((m) => ({
            ...m,
            "JEU DE SOCIETE": [...m["JEU DE SOCIETE"], result],
            }))
        }
    }

    function onSuccessPeluche(result : PelucheSelect | null) {
        console.log("onSuccessPeluche: " + result);
        console.log(result);
        if(result) {
            setImages((m) => ({
            ...m,
            "PELUCHE": [...m["PELUCHE"], result],
            }))
        }
    }

    function getForm(t: TYPE_IMAGE_TYPE) :  JSX.Element {
        switch(t) {
            case "MARQUE":
                return <NewMarqueForm onSuccess={onSuccessMarque}/>
            case "JOUET":
                return <NewJouetForm onSuccess={onSuccessJouet}/>
            case "JEU DE SOCIETE":
                return <NewJouetDeSocieteForm onSuccess={onSuccessJeuDeSociete}/>;
            case "PELUCHE":
                return <NewPelucheForm onSuccess={onSuccessPeluche}/>
        }
        return <></>;
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