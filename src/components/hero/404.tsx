import { Box, Text } from '@chakra-ui/react';
import { COLORS } from '../../theme/Couleur';

export default function Erreur404() {
    return (
        <Box minW="100vw" minH="100vh" bg={COLORS.backgroundCard} color={COLORS.primary}>
            <Text>Erreur 404</Text>
        </Box>
    );
}
