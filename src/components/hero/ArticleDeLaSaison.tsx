import { Box, VStack } from '@chakra-ui/react';
import VideoCard from '../card/VideoCard';
import BoutonCreationVideo from '../modal/BoutonCreationVideo';
import type { VideoCreateType, VideoSelectType } from '../../types/VideoType';
import {
    useDeleteArticleDeLaSaisonMutation,
    useGetArticleDeLaSaisonQuery,
    useReplaceArticleDeLaSaisonMutation,
} from '../../redux/features/article_de_la_saison/ArticleDeLaSaisonApi';

export default function ArticleDeLaSaison() {
    const [deleteArticleDeLaSaison] = useDeleteArticleDeLaSaisonMutation();
    const [replaceArticleDeLaSaison] = useReplaceArticleDeLaSaisonMutation();
    const { data: video } = useGetArticleDeLaSaisonQuery();
    async function supabaseAction(newVideo: VideoCreateType): Promise<VideoSelectType | null> {
        try {
            const result = await replaceArticleDeLaSaison(newVideo).unwrap();
            return result;
        } catch (error) {
            console.error("Erreur lors de l'ajout d'une vidéo du moment: ", error);
            return null;
        }
    }

    function handleDelete(_id: number) {
        deleteArticleDeLaSaison();
    }

    const videoSize = {
        w: { base: '85vw', md: '100%' },
        maxW: { base: '1100px', md: 'none' },
        h: { base: '48vh', sm: '52vh', md: '40vh', lg: '60vh' },
    };

    return (
        <VStack align="center">
            <BoutonCreationVideo
                submitMessage="Remplacer l'article de la saison"
                resetMessage="Remplacer l'article de la saison"
                supabaseAction={supabaseAction}
            />
            {/* <NewVideoForm submitMessage="Ajouter un vidéo" supabaseAction={addVideosDuMoment}/> */}
            <Box display="flex" w="full" justifyContent="center">
                {video ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        minW={{ md: '0' }}
                        w={{ md: 'calc(50% - 0.5rem)' }}
                        maxW={{ md: '676px' }}
                    >
                        <VideoCard
                            v={video}
                            index={1}
                            handleDelete={handleDelete}
                            videoSize={videoSize}
                        />
                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </VStack>
    );
}
