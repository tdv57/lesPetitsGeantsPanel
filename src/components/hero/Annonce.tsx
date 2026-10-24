import { HStack, VStack } from "@chakra-ui/react";
import { useDeleteAnnonceMutation, useGetAnnonceQuery } from "../../redux/features/annonce/AnnonceApi";
import { BoutonAnnonce } from "../modal/BoutonAnnonce";
import { TypeMediaEnumValue } from "../../enum/TypeMediaEnum";
import { AnnonceCard } from "../card/AnnonceCard";

export function Annonce() {

    const { data: annonces = [] } = useGetAnnonceQuery();
    const [ deleteAnnonce ] = useDeleteAnnonceMutation();

    const handleDelete = async (id: number) => deleteAnnonce(id);

    return (
        <>
            <VStack align="center">
                <HStack>
                    <BoutonAnnonce
                        submitMessage="Ajouter une annonce utilisant une image"
                        resetMessage="Ajouter une nouvelle annonce utilisant une image"
                        mediaType={TypeMediaEnumValue.IMAGE}
                    />
                    <BoutonAnnonce
                        submitMessage="Ajouter une annonce utilisant une vidéo"
                        resetMessage="Ajouter une nouvelle annonce utilisant une vidéo"
                        mediaType={TypeMediaEnumValue.VIDEO}
                    />
                </HStack>
                {/* <NewVideoForm submitMessage="Ajouter un vidéo" supabaseAction={addVideosDuMoment}/> */}
                <VStack gap={10} align="center">
                    {annonces.map((annonce, index) => {
                        return (
                            <>
                                <AnnonceCard annonce={annonce} key={index} index={index} handleDelete={handleDelete} />
                            </>
                        );
                    })}
                </VStack>
            </VStack>
        </>
    );
}