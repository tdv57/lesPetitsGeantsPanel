import { Flex, VStack } from '@chakra-ui/react';
import {
    useDeleteAnnonceMutation,
    useGetAnnonceQuery,
} from '../../redux/features/annonce/AnnonceApi';
import { BoutonAnnonce } from '../modal/BoutonAnnonce';
import { TypeMediaEnumValue } from '../../enum/TypeMediaEnum';
import { AnnonceCard } from '../card/AnnonceCard';

export function Annonce() {
    const { data: annonces = [] } = useGetAnnonceQuery();
    const [deleteAnnonce] = useDeleteAnnonceMutation();

    const handleDelete = async (id: number) => deleteAnnonce(id);

    return (
        <>
            <VStack align="center" width="100%" pt={{ base: 4, md: 8 }}>
                <Flex wrap="wrap" justify="center" gap={4} mb={4}>
                    <BoutonAnnonce
                        size="large"
                        submitMessage="Ajouter une annonce utilisant une image"
                        resetMessage="Ajouter une nouvelle annonce utilisant une image"
                        mediaType={TypeMediaEnumValue.IMAGE}
                    />
                    <BoutonAnnonce
                        size="large"
                        submitMessage="Ajouter une annonce utilisant une vidéo"
                        resetMessage="Ajouter une nouvelle annonce utilisant une vidéo"
                        mediaType={TypeMediaEnumValue.VIDEO}
                    />
                </Flex>
                <VStack gap={8} align="center" width="100%" pb={8}>
                    {annonces.map((annonce, index) => (
                        <AnnonceCard
                            key={annonce.id}
                            annonce={annonce}
                            index={index}
                            handleDelete={handleDelete}
                        />
                    ))}
                </VStack>
            </VStack>
        </>
    );
}
