import { useState } from 'react';
import { typeImageMapping, type TYPE_IMAGE_TYPE } from '../../types/ImageType';
import TypeImageSelection from '../card/TypeImageSelection';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import { BoutonCreationImage } from '../modal/BoutonCreationImage';
import ImageCard from '../card/ImageCard';
import {
    useDeleteImageMutation,
    useGetImageByTypeQuery,
} from '../../redux/features/images/ImageApi';

export default function Images() {
    const [typeImage, setTypeImage] = useState<TYPE_IMAGE_TYPE[]>([]);
    const [deleteImage] = useDeleteImageMutation();

    const { data: images = [] } = useGetImageByTypeQuery(typeImage[0], {
        skip: !typeImage[0],
    });

    function handleDelete(id: number, type: TYPE_IMAGE_TYPE) {
        deleteImage({ id: id, type: type });
    }

    return (
        <>
            <VStack alignContent="center" justifyContent="center">
                <TypeImageSelection typeImage={typeImage} setTypeImage={setTypeImage} />
                {typeImage.length > 0 ? (
                    <BoutonCreationImage
                        typeImageLabel={typeImage[0]}
                        typeImageValue={typeImageMapping.find(typeImage[0])?.value ?? ''}
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
                            columns={{ base: 1, sm: 2, md: 3 }}
                            gap={8}
                            justifyItems="center"
                            alignItems="stretch"
                            margin={8}
                        >
                            {images.map((image) => (
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
