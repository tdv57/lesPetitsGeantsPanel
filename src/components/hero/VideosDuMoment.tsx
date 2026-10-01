import {
    useAddVideosDuMomentMutation,
    useDeleteVideosDuMomentMutation,
    useGetVideosDuMomentQuery,
} from '../../redux/features/videos_du_moment/VideosDuMomentApi';
import type { VideoCreateType, VideoSelectType } from '../../types/VideoType';
import { VStack } from '@chakra-ui/react';
import VideoCard from '../card/VideoCard';
import BoutonCreationVideo from '../modal/BoutonCreationVideo';
export default function VideosDuMoment() {
    const { data: videos = [] } = useGetVideosDuMomentQuery();
    const [deleteVideo] = useDeleteVideosDuMomentMutation();
    const [addVideosDuMoment] = useAddVideosDuMomentMutation();

    function handleDelete(id: number) {
        deleteVideo(id);
    }

    async function supabaseAction(newVideo: VideoCreateType): Promise<VideoSelectType | null> {
        try {
            const result = await addVideosDuMoment(newVideo).unwrap();
            return result;
        } catch (error) {
            console.error("Erreur lors de l'ajout d'une vidéo du moment: ", error);
            return null;
        }
    }

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
