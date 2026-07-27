import { useContext } from "react";
import { VideosDuMomentContext } from "../components/context/VideosDuMoment";

export function useVideosDuMoment() {
    const context = useContext(VideosDuMomentContext);
    if (!context) {
        throw new Error("useVideos doit être utilisé à l'intérieur d'un VideosProvider");
    }
    return context;
}