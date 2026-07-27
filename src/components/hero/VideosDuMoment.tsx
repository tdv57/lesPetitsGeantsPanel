import { addVideosDuMoment, deleteVideosDuMoment } from "../../service/VideoService";
import type { VideoSelectType } from "../../service/VideoService";
import { VStack } from "@chakra-ui/react";
import VideoCard from "../card/VideoCard";
import BoutonCreation from "../modal/BoutonCreation";
import { useVideosDuMoment } from "../../hook/useVideosDuMoment";
export default function VideosDuMoment() {

    const {videos, setVideos} = useVideosDuMoment();
    function onSuccess(result : VideoSelectType | null) {
        if (result) {
            setVideos((results) => [result, ...results])
        } else console.log("Erreur BoutonCreation OnSuccess result null");
    }

    return(
        <>

            <VStack align="center" >
                <BoutonCreation submitMessage="Ajouter une vidéo" resetMessage="Ajouter une nouvelle vidéo" setVideos={setVideos} supabaseAction={addVideosDuMoment} onSuccess={onSuccess}/>
                {/* <NewVideoForm submitMessage="Ajouter un vidéo" supabaseAction={addVideosDuMoment}/> */}
                <VStack gap={10} align="center">
                    { videos.map((v, index) => {
                        return(
                            <>
                                <VideoCard v={v} index={index} setVideos={setVideos} supabaseDeleteAction={deleteVideosDuMoment}/>
                            </>

                        )
                    })}
                </VStack>
            </VStack>


        </>
    );
}