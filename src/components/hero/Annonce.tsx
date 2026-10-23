import { Box, VStack } from "@chakra-ui/react";
import BoutonCreationVideo from "../modal/BoutonCreationVideo";
import VideoCard from "../card/VideoCard";
import { useGetAnnonceQuery } from "../../redux/features/annonce/AnnonceApi";

export function Annonce() {

    const { data: annonces } = useGetAnnonceQuery();
    
    return (
        <>
            <VStack align="center">
                <BoutonCreationVideo
                    submitMessage="Ajouter une vidéo"
                    resetMessage="Ajouter une nouvelle vidéo"
                    supabaseAction={supabaseAction}
                />
                {/* <NewVideoForm submitMessage="Ajouter un vidéo" supabaseAction={addVideosDuMoment}/> */}
                <VStack gap={10} align="center">
                    {videos.map((v, index) => {
                        return (
                            <>
                                <VideoCard v={v} index={index} handleDelete={handleDelete} />
                            </>
                        );
                    })}
                </VStack>
            </VStack>
        </>
    );
}