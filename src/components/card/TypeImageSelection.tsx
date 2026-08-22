import { Portal, Select } from "@chakra-ui/react";
import { type TYPE_IMAGE_TYPE, typeImageCollection } from "../../types/ImageType"

type TypeImageSelectionPropsType = {
    setTypeImage: React.Dispatch<React.SetStateAction<TYPE_IMAGE_TYPE[]>>;
    typeImage: TYPE_IMAGE_TYPE[];
}
export default function TypeImageSelection({typeImage, setTypeImage} : TypeImageSelectionPropsType) {
    return (
        <>
            <Select.Root 
                gap={{ base: "3", sm: "5" }}
                collection={typeImageCollection}
                value={typeImage}
                onValueChange={(e) => setTypeImage(e.value as TYPE_IMAGE_TYPE[])}
                size="md"              
                variant="outline"    
                colorPalette="teal"   
                width="300px"
            >
                <Select.HiddenSelect/>
                <Select.Label textAlign="center" fontSize={{ base: "xl", sm: "2xl", md: "2xl" }}>
                    Type d'image
                </Select.Label>
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText fontSize={{ base: "md", sm: "lg", md: "lg" }} color="white" placeholder="Sélectionner le type d'image"/>
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator/>
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                     <Select.Positioner>
                        <Select.Content>
                            {typeImageCollection.items.map((t, index) => (
                                <Select.Item color="black" borderColor="black" fontSize={{ base: "md", sm: "md", md: "lg"}} item={t} key={index}>
                                    {t.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}

                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </>
    );
}