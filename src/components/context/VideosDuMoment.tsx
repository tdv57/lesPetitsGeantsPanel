import { createContext, useEffect, useState, type ReactNode } from "react";
import { getVideosDuMoment, type VideoSelectType } from "../../service/VideoService";

type VideosDuMomentContextType = {
    videos : VideoSelectType[];
    setVideos: React.Dispatch<React.SetStateAction<VideoSelectType[]>>;
}
export const VideosDuMomentContext = createContext<VideosDuMomentContextType | null>(null);

export function VideosDuMomentProvider({children}: { children: ReactNode })  {
    const [videosDuMoment, setVideosDuMoment] = useState<VideoSelectType[]>([]);

    useEffect(() => {
        getVideosDuMoment().then((result) => {
            if (result) {
                setVideosDuMoment(result);
            }
        });
    }, []);

    return (
        <VideosDuMomentContext.Provider value={{videos: videosDuMoment, setVideos: setVideosDuMoment}}>
            {children}
        </VideosDuMomentContext.Provider>
    );
}


