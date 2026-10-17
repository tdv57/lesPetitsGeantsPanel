import { Box, Heading, Image } from '@chakra-ui/react';
import type { ImageSelect } from '../../types/ImageType';
import ConfirmationSuppression from '../modal/ConfirmationSuppression';
import { type TypeImageEnum, TypeImageEnumValue, typeImageMapping } from '../../enum/TypeImageEnum';
import { BoutonModificationImage } from '../modal/BoutonCreationImage';
import { mapAge } from '../../mapper/AgeMapper';

type ImageCardPropType = {
    imageSelect: ImageSelect;
    handleDelete: (id: number, type: TypeImageEnum) => void;
};

export default function ImageCard({ imageSelect, handleDelete }: ImageCardPropType) {
    return (
        <>
            <Box
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius="12px"
                width={{ base: '250px', sm: '80%', md: '80%' }}
                height={{ base: '400px', sm: '90%', md: '100%' }}
            >
                <Box
                    width={{ base: '250px', sm: '80%', md: '80%' }}
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
                                    size={{ base: 'md', md: '2xl' }}
                                    color="whiteAlpha.900"
                                    lineClamp={2}
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
                                    maxWidth="100%"
                                    maxHeight="100%"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                            </Box>
                        </>
                    )}
                    {(imageSelect.typeImage === TypeImageEnumValue.PELUCHE 
                    || imageSelect.typeImage === TypeImageEnumValue.BAGAGERIE 
                    || imageSelect.typeImage === TypeImageEnumValue.BIJOUX) 
                    && (
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
                    {(imageSelect.typeImage === TypeImageEnumValue.JOUET 
                      || imageSelect.typeImage === TypeImageEnumValue.LOISIR_CREATIF
                      || imageSelect.typeImage === TypeImageEnumValue.DEGUISEMENT) && (
                        <>
                            <Box
                                textAlign="center"
                                flexShrink="0"
                                mb={2}
                                fontSize={{ base: 'sm' }}
                                overflow="hidden"
                            >
                                <Heading
                                    size={{ base: 'sm', md: '2xl' }}
                                    color="whiteAlpha.900"
                                    lineClamp={2}
                                >
                                    {imageSelect.description}
                                </Heading>
                                <Heading size="sm" color="whiteAlpha.600" lineClamp={1}>
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
                                    size={{ base: 'sm', md: '2xl' }}
                                    color="whiteAlpha.900"
                                    lineClamp={2}
                                >
                                    {imageSelect.description}
                                </Heading>
                                <Heading size="sm" color="whiteAlpha.600" lineClamp={1}>
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
                                    size={{ base: 'sm', md: '2xl' }}
                                    color="whiteAlpha.900"
                                    lineClamp={2}
                                >
                                    {imageSelect.description}
                                </Heading>
                                <Heading size="sm" color="whiteAlpha.600" lineClamp={1}>
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
                                    size={{ base: 'sm', md: '2xl' }}
                                    color="whiteAlpha.900"
                                    lineClamp={2}
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
                    <Box flexShrink="0" mt={2}>
                        <BoutonModificationImage
                            image={imageSelect}
                            typeImageLabel={imageSelect.typeImage}
                            typeImageValue={
                                typeImageMapping.items
                                    .find((t) => t.label === imageSelect.typeImage)
                                    ?.value?.toLowerCase() ?? ''
                            }
                        />
                    </Box>
                    <Box flexShrink="0" mt={2}>
                        <ConfirmationSuppression
                            id={imageSelect.id}
                            handleDelete={(id) => handleDelete(id, imageSelect.typeImage)}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}
