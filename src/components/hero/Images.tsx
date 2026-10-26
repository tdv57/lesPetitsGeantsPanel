import { useState } from 'react';
import TypeImageSelection from '../card/TypeImageSelection';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import { BoutonModificationImage } from '../modal/BoutonCreationImage';
import ImageCard from '../card/ImageCard';
import {
    useDeleteImageMutation,
    useGetImageByTypeQuery,
} from '../../redux/features/images/ImageApi';
import { typeImageMapping, type TypeImageEnum } from '../../enum/TypeImageEnum';
import type { ImageSelect } from '../../types/ImageType';

export default function Images() {
    const [typeImage, setTypeImage] = useState<TypeImageEnum[]>([]);
    const [deleteImage] = useDeleteImageMutation();

    const { data: images = [] } = useGetImageByTypeQuery(typeImage[0], {
        skip: !typeImage[0],
    });

    function handleDelete(id: number, type: TypeImageEnum) {
        deleteImage({ id: id, type: type });
    }

    return (
        <>
            <VStack alignContent="center" justifyContent="center" pt={{ base: 4, md: 8 }}>
                <TypeImageSelection typeImage={typeImage} setTypeImage={setTypeImage} />
                {typeImage.length > 0 ? (
                    <BoutonModificationImage
                        size="large"
                        typeImageLabel={typeImage[0]}
                        typeImageValue={
                            typeImageMapping.items
                                .find((t) => t.label === typeImage[0])
                                ?.value?.toLowerCase() ?? ''
                        }
                    />
                ) : (
                    <></>
                )}
                {typeImage.map((type, _index) => (
                    <Box
                        key={type}
                        hidden={!(type === typeImage[0])}
                        display="flex"
                        justifyContent="center"
                    >
                        <SimpleGrid
                            templateColumns={{
                                base: 'min(85vw, 320px)',
                                md: 'repeat(2, minmax(0, 40vw))',
                                lg: 'repeat(3, minmax(0, 28vw))',
                            }}
                            autoRows="clamp(380px, 60vh, 560px)"
                            gap={8}
                            justifyItems="center"
                            alignItems="stretch"
                            margin={8}
                        >
                            {images.map((image: ImageSelect) => (
                                <ImageCard
                                    key={image.id}
                                    imageSelect={image}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </SimpleGrid>
                    </Box>
                ))}
            </VStack>
        </>
    );
}
