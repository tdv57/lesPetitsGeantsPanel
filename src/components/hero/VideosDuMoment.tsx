import { addVideosDuMoment, deleteVideosDuMoment } from "../../service/VideoService";
import type { VideoSelectType } from "../../service/VideoService";
import { VStack } from "@chakra-ui/react";
import VideoCard from "../card/VideoCard";
import BoutonCreationVideo from "../modal/BoutonCreationVideo";
import { useVideosDuMoment } from "../../hook/useVideosDuMoment";
export default function VideosDuMoment() {

    const {videos, setVideos} = useVideosDuMoment();
    function onSuccess(result : VideoSelectType | null) {
        if (result) {
            setVideos((results) => [result, ...results])
        } else console.log("Erreur BoutonCreation OnSuccess result null");
    }

    function handleDelete(id: number) {
        deleteVideosDuMoment(id).then((b) => {
            if (b) {
                setVideos((videos: VideoSelectType[]) => {
                    const newVideos = videos.filter((video) => video.id != id);
                    return newVideos;
                })
            }
        })
    }

    return(
        <>

            <VStack align="center" >
                <BoutonCreationVideo submitMessage="Ajouter une vidéo" resetMessage="Ajouter une nouvelle vidéo" setVideos={setVideos} supabaseAction={addVideosDuMoment} onSuccess={onSuccess}/>
                {/* <NewVideoForm submitMessage="Ajouter un vidéo" supabaseAction={addVideosDuMoment}/> */}
                <VStack gap={10} align="center">
                    { videos.map((v, index) => {
                        return(
                            <>
                                <VideoCard v={v} index={index} handleDelete={handleDelete}/>
                            </>

                        )
                    })}
                </VStack>
            </VStack>


        </>
    );
}