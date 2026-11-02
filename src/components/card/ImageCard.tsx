import { Box, Heading, Image } from '@chakra-ui/react';
import type { ImageSelect } from '../../types/ImageType';
import ConfirmationSuppression from '../modal/ConfirmationSuppression';
import { type TypeImageEnum, TypeImageEnumValue, typeImageMapping } from '../../enum/TypeImageEnum';
import { BoutonModificationImage } from '../modal/BoutonCreationImage';
import { mapAge } from '../../mapper/AgeMapper';
import { COLORS } from '../../theme/Couleur';

type ImageCardPropType = {
    imageSelect: ImageSelect;
    handleDelete: (id: number, type: TypeImageEnum) => void;
};

export default function ImageCard({ imageSelect, handleDelete }: ImageCardPropType) {
    return (
        <>
            <Box
                bg={COLORS.backgroundCard}
                backdropFilter="blur(10px)"
                border="1px solid"
                color={COLORS.primary}
                borderColor="whiteAlpha.200"
                borderRadius="12px"
                width="100%"
                height="100%"
            >
                <Box
                    width="90%"
                    height="100%"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{ base: 2 }}
                >
                    {imageSelect.typeImage === TypeImageEnumValue.MARQUE && (
                        <>
                            <Box
                                textAlign="center"
                                flexShrink="0"
                                mb={2}
                                fontSize={{ base: 'sm' }}
                                overflow="hidden"
                            >
                                <Heading
                                    fontWeight="bold"
                                    fontSize={{ base: 'md', md: 'xl', lg: '3xl' }}
                                >
                                    {imageSelect.marque}
                                </Heading>
                            </Box>

                            <Box
                                flex="1"
                                minHeight="0"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                            >
                                <Image
                                    src={imageSelect.url}
                                    alt={imageSelect.marque}
                                    maxWidth="80%"
                                    maxHeight="80%"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                            </Box>
                        </>
                    )}
                    {(imageSelect.typeImage === TypeImageEnumValue.PELUCHE ||
                        imageSelect.typeImage === TypeImageEnumValue.BAGAGERIE ||
                        imageSelect.typeImage === TypeImageEnumValue.BIJOUX) && (
                        <Box
                            flex="1"
                            minHeight="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                        >
                            <Image
                                src={imageSelect.url}
                                alt={imageSelect.marque}
                                maxWidth="100%"
                                maxHeight="100%"
                                objectFit="contain"
                                borderRadius="md"
                            />
                        </Box>
                    )}
                    {(imageSelect.typeImage === TypeImageEnumValue.JOUET ||
                        imageSelect.typeImage === TypeImageEnumValue.LOISIR_CREATIF ||
                        imageSelect.typeImage === TypeImageEnumValue.DEGUISEMENT) && (
                        <>
                            <Box
                                textAlign="center"
                                flexShrink="0"
                                mb={2}
                                fontSize={{ base: 'sm' }}
                                overflow="hidden"
                            >
                                <Heading
                                    fontWeight="normal"
                                    fontSize={{ base: 'xs', md: 'sm', lg: 'lg' }}
                                >
                                    {imageSelect.description}
                                </Heading>
                                <Heading fontWeight="normal" fontSize={{ base: 'xs', lg: 'lg' }}>
                                    {mapAge(imageSelect.age, imageSelect.typeAge)}
                                </Heading>
                            </Box>

                            <Box
                                flex="1"
                                minHeight="0"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                            >
                                <Image
                                    src={imageSelect.url}
                                    alt={`${imageSelect.description ?? ''} ${mapAge(imageSelect.age, imageSelect.typeAge)}`}
                                    maxWidth="100%"
                                    maxHeight="100%"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                            </Box>
                        </>
                    )}
                    {imageSelect.typeImage === TypeImageEnumValue.JEU_DE_SOCIETE && (
                        <>
                            <Box
                                textAlign="center"
                                flexShrink="0"
                                mb={2}
                                fontSize={{ base: 'sm' }}
                                overflow="hidden"
                            >
                                <Heading
                                    fontWeight="normal"
                                    fontSize={{ base: 'xs', md: 'sm', lg: 'lg' }}
                                >
                                    {imageSelect.description}
                                </Heading>
                                <Heading fontWeight="normal" fontSize={{ base: 'xs', lg: 'lg' }}>
                                    {mapAge(imageSelect.age, imageSelect.typeAge)}
                                </Heading>
                            </Box>

                            <Box
                                flex="1"
                                minHeight="0"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                            >
                                <Image
                                    src={imageSelect.url}
                                    alt={`${imageSelect.description ?? ''} ${mapAge(imageSelect.age, imageSelect.typeAge)}`}
                                    maxWidth="100%"
                                    maxHeight="100%"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                            </Box>
                        </>
                    )}
                    {imageSelect.typeImage === TypeImageEnumValue.LIVRE && (
                        <>
                            <Box
                                textAlign="center"
                                flexShrink="0"
                                mb={2}
                                fontSize={{ base: 'sm' }}
                                overflow="hidden"
                            >
                                <Heading
                                    fontWeight="normal"
                                    fontSize={{ base: 'xs', md: 'sm', lg: 'lg' }}
                                >
                                    {imageSelect.description}
                                </Heading>
                                <Heading fontWeight="normal" fontSize={{ base: 'xs', lg: 'lg' }}>
                                    {mapAge(imageSelect.age, imageSelect.typeAge)}
                                </Heading>
                            </Box>

                            <Box
                                flex="1"
                                minHeight="0"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                            >
                                <Image
                                    src={imageSelect.url}
                                    alt={`${imageSelect.description ?? ''} ${mapAge(imageSelect.age, imageSelect.typeAge)}`}
                                    maxWidth="100%"
                                    maxHeight="100%"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                            </Box>
                        </>
                    )}
                    {imageSelect.typeImage === TypeImageEnumValue.DECORATION && (
                        <>
                            <Box
                                textAlign="center"
                                flexShrink="0"
                                mb={2}
                                fontSize={{ base: 'sm' }}
                                overflow="hidden"
                            >
                                <Heading
                                    fontWeight="normal"
                                    fontSize={{ base: 'xs', md: 'sm', lg: 'lg' }}
                                >
                                    {imageSelect.description}
                                </Heading>
                            </Box>

                            <Box
                                flex="1"
                                minHeight="0"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                            >
                                <Image
                                    src={imageSelect.url}
                                    alt={`${imageSelect.description ?? ''} ${mapAge(imageSelect.age, imageSelect.typeAge)}`}
                                    maxWidth="100%"
                                    maxHeight="100%"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                            </Box>
                        </>
                    )}
                    <Box
                        flexShrink="0"
                        mt="auto"
                        display="flex"
                        flexDir="row"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={2}
                        w="100%"
                        pb={3}
                    >
                        <Box flex="1 1 140px">
                            <BoutonModificationImage
                                size="small"
                                image={imageSelect}
                                typeImageLabel={imageSelect.typeImage}
                                typeImageValue={
                                    typeImageMapping.items
                                        .find((t) => t.label === imageSelect.typeImage)
                                        ?.value?.toLowerCase() ?? ''
                                }
                            />
                        </Box>
                        <Box flex="1 1 140px">
                            <ConfirmationSuppression
                                id={imageSelect.id}
                                handleDelete={(id) => handleDelete(id, imageSelect.typeImage)}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
