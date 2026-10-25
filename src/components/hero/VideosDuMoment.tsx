import {
    useAddVideosDuMomentMutation,
    useDeleteVideosDuMomentMutation,
    useGetVideosDuMomentQuery,
} from '../../redux/features/videos_du_moment/VideosDuMomentApi';
import type { VideoCreateType, VideoSelectType } from '../../types/VideoType';
import { Box, VStack } from '@chakra-ui/react';
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

    const videoSize = {
        w: { base: '85vw', md: '100%' },
        maxW: { base: '1100px', md: 'none' },
        h: { base: '48vh', sm: '52vh', md: '40vh', lg: '48vh' },
    };

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
                    <Box
                        display={{ base: 'contents', md: 'grid' }}
                        gridTemplateColumns={{ md: 'repeat(2, 1fr)' }}
                        gap={{ md: '12' }}
                        w={{ md: '100%' }}
                        maxW={{ md: '1400px' }}
                        px={{ md: 4 }}
                    >
                        {videos.map((v, index) => {
                            return (
                                <VideoCard
                                    key={`${v.id}`}
                                    v={v}
                                    index={index}
                                    handleDelete={handleDelete}
                                    videoSize={videoSize}
                                />
                            );
                        })}
                    </Box>
                </VStack>
            </VStack>
        </>
    );
}
