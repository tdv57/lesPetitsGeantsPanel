import { useState } from "react";
import { TYPE_IMAGE_VALUE, type TYPE_IMAGE_TYPE } from "../../types/ImageType";
import TypeImageSelection from "../card/TypeImageSelection";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { BoutonCreationImage } from "../modal/BoutonCreationImage";
import ImageCard from "../card/ImageCard";
import { useDeleteImageMutation, useGetImageByTypeQuery } from "../../redux/features/images/ImageApi";

export default function Images() {
    const [typeImage, setTypeImage] = useState<TYPE_IMAGE_TYPE[]>([]);
    const [ deleteImage ] = useDeleteImageMutation();
    const { data: marques = [] } = useGetImageByTypeQuery(TYPE_IMAGE_VALUE.MARQUE);
    const { data: jouets = [] } = useGetImageByTypeQuery(TYPE_IMAGE_VALUE.JOUET);
    const { data: jeuxDeSociete = [] } = useGetImageByTypeQuery(TYPE_IMAGE_VALUE.JEU_DE_SOCIETE);
    const { data: peluches = [] } = useGetImageByTypeQuery(TYPE_IMAGE_VALUE.PELUCHE);
    
    function handleDelete(id: number, type : TYPE_IMAGE_TYPE) {
        deleteImage({id: id, type: type});
    }

    const typeImageMapping = {
        "JOUET" : "Jouet",
        "PELUCHE" : "Peluche",
        "MARQUE" : "Marque",
        "JEU DE SOCIETE" : "Jeu de société"
    };

    const images = {
        [TYPE_IMAGE_VALUE.MARQUE] : marques ,
        [TYPE_IMAGE_VALUE.PELUCHE] : peluches,
        [TYPE_IMAGE_VALUE.JOUET] : jouets,
        [TYPE_IMAGE_VALUE.JEU_DE_SOCIETE] : jeuxDeSociete
    };

    return (
        <>
        <VStack alignContent="center" justifyContent="center" >
            <TypeImageSelection typeImage={typeImage} setTypeImage={setTypeImage}/>
            {typeImage.length > 0 ? <BoutonCreationImage typeImageLabel={typeImage[0]} typeImageValue={typeImageMapping[typeImage[0]] as "Jouet" | "Peluche" | "Marque" | "Jeu de société" }/> : <></>}
            { typeImage.map((type, index) => {
                console.log("type courant:", type, "| hidden ?", !(type === typeImage[0]), "| images[type]:", images[type]);
                return (
                <Box key={index}  hidden={!(type === typeImage[0])} display="flex" justifyContent="center">
                    <SimpleGrid columns={{base: 1, sm:2, md:3}} gap={8} justifyItems="center"  alignItems="stretch" margin={8}>
                        {images[type].map(image => <ImageCard key={image.id} imageSelect={image} handleDelete={handleDelete}/> ) }
                    </SimpleGrid>
                </Box>
                );
            })}
        </VStack>
        </>
    );
}