import { useState } from "react";
import { type TYPE_IMAGE } from "../../service/ImageService";
import TypeImageSelection from "../card/TypeImageSelection";
import { HStack, VStack } from "@chakra-ui/react";
import { BoutonCreationImage } from "../modal/BoutonCreationImage";

export default function Images() {
    const [typeImage, setTypeImage] = useState<TYPE_IMAGE[]>([]);
    const typeImageMapping = {
        "JOUET" : "Jouet",
        "PELUCHE" : "Peluche",
        "MARQUE" : "Marque",
        "JEU DE SOCIETE" : "Jeu de société"
    }
    return (
        <>
        <VStack alignContent="center" justifyContent="center" >
            <TypeImageSelection typeImage={typeImage} setTypeImage={setTypeImage}/>
            {typeImage.length > 0 ? <BoutonCreationImage typeImageLabel={typeImage[0]} typeImageValue={typeImageMapping[typeImage[0]] as "Jouet" | "Peluche" | "Marque" | "Jeu de société" }/> : <></>}
        </VStack>
        </>
    );
}