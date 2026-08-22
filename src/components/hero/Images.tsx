import { useState } from "react";
import { type TYPE_IMAGE_TYPE } from "../../types/ImageType";
import TypeImageSelection from "../card/TypeImageSelection";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { BoutonCreationImage } from "../modal/BoutonCreationImage";
import { useImages } from "../../hook/useImages";
import ImageCard from "../card/ImageCard";

export default function Images() {
    const [typeImage, setTypeImage] = useState<TYPE_IMAGE_TYPE[]>([]);
    const typeImageMapping = {
        "JOUET" : "Jouet",
        "PELUCHE" : "Peluche",
        "MARQUE" : "Marque",
        "JEU DE SOCIETE" : "Jeu de société"
    }
    const {images} = useImages();
    console.log("typeImage:", typeImage);
    console.log("images:", images);
    return (
        <>
        <VStack alignContent="center" justifyContent="center" >
            <TypeImageSelection typeImage={typeImage} setTypeImage={setTypeImage}/>
            {typeImage.length > 0 ? <BoutonCreationImage typeImageLabel={typeImage[0]} typeImageValue={typeImageMapping[typeImage[0]] as "Jouet" | "Peluche" | "Marque" | "Jeu de société" }/> : <></>}
            { typeImage.map((type, index) => {
                console.log("type courant:", type, "| hidden ?", !(type === typeImage[0]), "| images[type]:", images[type]);
                return (
                <Box key={index}  hidden={!(type === typeImage[0])} display="flex" justifyContent="center">
                    <SimpleGrid columns={{base: 1, sm:2, md:3}} gap={8} justifyItems="center" margin={8}>
                        {images[type].map(image =>{  console.log("image à afficher:", image); return<ImageCard key={image.id} imageSelect={image}/>; } ) }
                    </SimpleGrid>
                    
                </Box>
                );
            })}
        </VStack>
        </>
    );
}