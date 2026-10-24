import { Box, Heading, VStack, Image } from "@chakra-ui/react";
import type { AnnonceSelect } from "../../types/AnnonceType";
import { TypeMediaEnumValue } from "../../enum/TypeMediaEnum";
import ConfirmationSuppression from "../modal/ConfirmationSuppression";
import { BoutonAnnonce } from "../modal/BoutonAnnonce";

type AnnonceCardPropsType = {
    index: number;
    annonce: AnnonceSelect;
    handleDelete: (id: number) => void;
};

export function AnnonceCard({index, annonce, handleDelete}: AnnonceCardPropsType) {
    return (
        <>
            <Box
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius="12px"
                width={{ base: '70%', sm: '70%', md: '50%' }}
                p={4}
                height={{ base: '90vh' }}
                display="flex"
                flexDir="column"
            >
                <VStack align="center" height="100%" gap={4}>
                    {annonce.commentaire && (
                        <Box flexShrink="0" textAlign="center">
                            <Heading size="2xl" color="whiteAlpha.900">
                                {annonce.commentaire}
                            </Heading>
                        </Box>
                    )}
                    <Box
                        flex="1"
                        minHeight="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={{ base: '90%', sm: '90%', md: '90%' }}
                    >
                        {
                            annonce.mediaType === TypeMediaEnumValue.VIDEO && 
                            <video
                                key={index}
                                src={annonce.url}
                                controls
                                width="full"
                                style={{
                                    borderRadius: '12px',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            />
                        } 
                        {
                            annonce.mediaType === TypeMediaEnumValue.IMAGE &&
                            <a href={annonce.redirectionLink ? annonce.redirectionLink : ''} target="_blank">
                                <Image
                                    src={annonce.url}
                                    alt={annonce.commentaire}
                                    maxWidth="100%"
                                    maxHeight="100%"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                            </a>
                        }

                    </Box>
                    <Box flexShrink="0">
                        <BoutonAnnonce
                            annonce={annonce}
                            submitMessage="Modifier une annonce qui utilisera une image"
                            resetMessage="Modifier cette nouvelle annonce qui utilisera une image"
                            mediaType={TypeMediaEnumValue.IMAGE}
                        />
                        <BoutonAnnonce
                            annonce={annonce}
                            submitMessage="Modifier une annonce qui utilisera une vidéo"
                            resetMessage="Modifier cette nouvelle annonce qui utilisera une vidéo"
                            mediaType={TypeMediaEnumValue.VIDEO}
                        />
                        <ConfirmationSuppression id={annonce.id} handleDelete={handleDelete} />
                    </Box>
                </VStack>
            </Box>
        </>
    );
}