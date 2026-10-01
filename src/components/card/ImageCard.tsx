import { Box, Heading, Image } from '@chakra-ui/react';
import { TYPE_IMAGE_VALUE, type ImageSelect, type TYPE_IMAGE_TYPE } from '../../types/ImageType';
import ConfirmationSuppression from '../modal/ConfirmationSuppression';

type ImageCardPropType = {
    imageSelect: ImageSelect;
    handleDelete: (id: number, type: TYPE_IMAGE_TYPE) => void;
};

export default function ImageCard({ imageSelect, handleDelete }: ImageCardPropType) {
    function handleDeleteMarque(id: number) {
        return handleDelete(id, TYPE_IMAGE_VALUE.MARQUE);
    }
    function handleDeleteJeuDeSociete(id: number) {
        return handleDelete(id, TYPE_IMAGE_VALUE.JEU_DE_SOCIETE);
    }
    function handleDeletePeluche(id: number) {
        return handleDelete(id, TYPE_IMAGE_VALUE.PELUCHE);
    }
    function handleDeleteJouet(id: number) {
        handleDelete(id, TYPE_IMAGE_VALUE.JOUET);
    }
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
                {imageSelect.typeImage === TYPE_IMAGE_VALUE.MARQUE && (
                    <Box
                        width={{ base: '250px', sm: '80%', md: '80%' }}
                        height="100%"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        mx="auto"
                        gap={{ base: 2 }}
                    >
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
                        <Box flexShrink="0" mt={2}>
                            <ConfirmationSuppression
                                id={imageSelect.id}
                                handleDelete={handleDeleteMarque}
                            />
                        </Box>
                    </Box>
                )}
                {imageSelect.typeImage === TYPE_IMAGE_VALUE.PELUCHE && (
                    <Box
                        width={{ base: '250px', sm: '80%', md: '80%' }}
                        height="100%"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        mx="auto"
                        gap={{ base: 2 }}
                    >
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
                        <Box flexShrink="0" mt={2}>
                            <ConfirmationSuppression
                                id={imageSelect.id}
                                handleDelete={handleDeletePeluche}
                            />
                        </Box>
                    </Box>
                )}
                {imageSelect.typeImage === TYPE_IMAGE_VALUE.JOUET && (
                    <Box
                        width={{ base: '250px', sm: '80%', md: '80%' }}
                        height="100%"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        mx="auto"
                        gap={{ base: 2 }}
                    >
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
                                {imageSelect.age}
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
                                alt={`${imageSelect.description ?? ''} ${imageSelect.age ?? ''}`}
                                maxWidth="100%"
                                maxHeight="100%"
                                objectFit="contain"
                                borderRadius="md"
                            />
                        </Box>

                        <Box flexShrink="0" mt={2}>
                            <ConfirmationSuppression
                                id={imageSelect.id}
                                handleDelete={handleDeleteJouet}
                            />
                        </Box>
                    </Box>
                )}
                {imageSelect.typeImage === TYPE_IMAGE_VALUE.JEU_DE_SOCIETE && (
                    <Box
                        width={{ base: '250px', sm: '80%', md: '80%' }}
                        height="100%"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        mx="auto"
                        gap={{ base: 2 }}
                    >
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
                                {imageSelect.age}
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
                                alt={`${imageSelect.description ?? ''} ${imageSelect.age ?? ''}`}
                                maxWidth="100%"
                                maxHeight="100%"
                                objectFit="contain"
                                borderRadius="md"
                            />
                        </Box>
                        <Box flexShrink="0" mt={2}>
                            <ConfirmationSuppression
                                id={imageSelect.id}
                                handleDelete={handleDeleteJeuDeSociete}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}
