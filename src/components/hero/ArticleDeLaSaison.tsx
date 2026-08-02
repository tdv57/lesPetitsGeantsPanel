import {VStack } from "@chakra-ui/react";
import { deleteArticleDeLaSaison, replaceArticleDeLaSaison, type VideoSelectType } from "../../service/VideoService";
import VideoCard from "../card/VideoCard";
import { useArticleDeLaSaison } from "../../hook/useArticleDeLaSaison";
import BoutonCreationVideo from "../modal/BoutonCreationVideo";

export default function ArticleDeLaSaison() {

    const {video, setVideo} = useArticleDeLaSaison();


    function onSuccess(result : VideoSelectType | null) {
        if (result) {
            setVideo((_) => [result])
        } else console.log("Erreur BoutonCreation OnSuccess result null");
    }

    return (

            <VStack align="center" >
                <BoutonCreationVideo submitMessage="Remplacer l'article de la saison" resetMessage="Remplacer l'article de la saison" setVideos={setVideo} supabaseAction={replaceArticleDeLaSaison} onSuccess={onSuccess}/>
                {/* <NewVideoForm submitMessage="Ajouter un vidéo" supabaseAction={addVideosDuMoment}/> */}
                <VStack gap={10} align="center">
                    {video.length > 0 ? <VideoCard v={video[0]} index={1} setVideos={setVideo} supabaseDeleteAction={deleteArticleDeLaSaison}/> : <></>}
                </VStack>
            </VStack>
    )
}