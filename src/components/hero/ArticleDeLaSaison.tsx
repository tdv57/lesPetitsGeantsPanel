import { VStack } from '@chakra-ui/react';
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

    return (
        <VStack align="center">
            <BoutonCreationVideo
                submitMessage="Remplacer l'article de la saison"
                resetMessage="Remplacer l'article de la saison"
                supabaseAction={supabaseAction}
            />
            {/* <NewVideoForm submitMessage="Ajouter un vidéo" supabaseAction={addVideosDuMoment}/> */}
            <VStack gap={10} align="center">
                {video ? <VideoCard v={video} index={1} handleDelete={handleDelete} /> : <></>}
            </VStack>
        </VStack>
    );
}
