import { Box, Heading, VStack, type BoxProps } from '@chakra-ui/react';
import ConfirmationSuppression from '../modal/ConfirmationSuppression';
import type { VideoSelectType } from '../../types/VideoType';
import { COLORS } from '../../theme/Couleur';

type VideoCardPropType = {
    index: number;
    v: VideoSelectType;
    handleDelete: (id: number) => void;
    videoSize?: BoxProps;
};
export default function VideoCard({ v, index, handleDelete, videoSize }: VideoCardPropType) {
    return (
        <>
            <Box
                bg={COLORS.backgroundCard}
                color={COLORS.primary}
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius="12px"
                width={{ md: 'full' }}
                p={4}
                height={{ base: 'full' }}
                display="flex"
                flexDir="column"
            >
                <VStack align="center" height="100%" gap={4}>
                    {v.description && (
                        <Box flexShrink="0" textAlign="center">
                            <Heading
                                fontWeight="normal"
                                fontSize={{ base: 'lg', sm: 'xl', md: '2xl', lg: '3xl' }}
                            >
                                {v.description}
                            </Heading>
                        </Box>
                    )}
                    {v.age && (
                        <Box flexShrink="0" textAlign="center">
                            <Heading
                                fontWeight="normal"
                                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                            >
                                {v.age}
                            </Heading>
                        </Box>
                    )}

                    <Box
                        position="relative"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        overflow="hidden"
                        {...videoSize}
                    >
                        <video
                            key={index}
                            src={v.url}
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
                    </Box>
                    <Box flexShrink="0" mt="auto">
                        <ConfirmationSuppression id={v.id} handleDelete={handleDelete} />
                    </Box>
                </VStack>
            </Box>
        </>
    );
}
