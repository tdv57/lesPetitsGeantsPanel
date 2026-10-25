import { Box, Heading, VStack, Image } from '@chakra-ui/react';
import type { AnnonceSelect } from '../../types/AnnonceType';
import { TypeMediaEnumValue } from '../../enum/TypeMediaEnum';
import ConfirmationSuppression from '../modal/ConfirmationSuppression';
import { BoutonAnnonce } from '../modal/BoutonAnnonce';
import { COLORS } from '../../theme/Couleur';

type AnnonceCardPropsType = {
    index: number;
    annonce: AnnonceSelect;
    handleDelete: (id: number) => void;
};

export function AnnonceCard({ index, annonce, handleDelete }: AnnonceCardPropsType) {
    return (
        <>
            <Box
                bg={COLORS.backgroundCard}
                color={COLORS.primary}
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius="12px"
                width={{ base: '90%', md: '60%' }}
                maxW="700px"
                p={4}
                display="flex"
                flexDir="column"
            >
                <VStack align="center" width="100%" gap={4}>
                    {annonce.commentaire && (
                        <Box flexShrink="0" textAlign="center">
                            <Heading
                                fontWeight="normal"
                                fontSize={{ base: 'lg', sm: 'xl', md: '2xl', lg: '3xl' }}
                                lineClamp={3}
                            >
                                {annonce.commentaire}
                            </Heading>
                        </Box>
                    )}
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                        {annonce.mediaType === TypeMediaEnumValue.VIDEO && (
                            <video
                                key={index}
                                src={annonce.url}
                                controls
                                width="full"
                                style={{
                                    borderRadius: '12px',
                                    maxWidth: '100%',
                                    maxHeight: 'min(60vh, 500px)',
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            />
                        )}
                        {annonce.mediaType === TypeMediaEnumValue.IMAGE && (
                            <a
                                href={annonce.redirectionLink ? annonce.redirectionLink : ''}
                                target="_blank"
                            >
                                <Image
                                    src={annonce.url}
                                    alt={annonce.commentaire}
                                    maxWidth="100%"
                                    maxHeight="min(60vh, 500px)"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                            </a>
                        )}
                    </Box>
                    <Box
                        flexShrink="0"
                        display="flex"
                        flexDir="row"
                        flexWrap="wrap"
                        justifyContent="center"
                        alignItems="stretch"
                        gap={2}
                        w="100%"
                        pb={3}
                    >
                        <Box flex="1 1 160px" display="flex" flexDir="column">
                            <BoutonAnnonce
                                size="small"
                                annonce={annonce}
                                submitMessage="Modifier une annonce qui utilisera une image"
                                resetMessage="Modifier cette nouvelle annonce qui utilisera une image"
                                mediaType={TypeMediaEnumValue.IMAGE}
                            />
                        </Box>
                        <Box flex="1 1 160px" display="flex" flexDir="column">
                            <BoutonAnnonce
                                size="small"
                                annonce={annonce}
                                submitMessage="Modifier une annonce qui utilisera une vidéo"
                                resetMessage="Modifier cette nouvelle annonce qui utilisera une vidéo"
                                mediaType={TypeMediaEnumValue.VIDEO}
                            />
                        </Box>
                        <Box flex="1 1 160px" display="flex" flexDir="column">
                            <ConfirmationSuppression id={annonce.id} handleDelete={handleDelete} />
                        </Box>
                    </Box>
                </VStack>
            </Box>
        </>
    );
}
