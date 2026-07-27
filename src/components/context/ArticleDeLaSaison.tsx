import { createContext, useEffect, useState, type ReactNode } from "react";
import { getArticleDeLaSaison, type VideoSelectType } from "../../service/VideoService";

type VideosDuMomentContextType = {
    video : VideoSelectType[];
    setVideo: React.Dispatch<React.SetStateAction<VideoSelectType[]>>;
}
export const ArticleDeLaSaisonContext = createContext<VideosDuMomentContextType|null>(null);

export function ArticleDeLaSaisonProvider({children} : { children: ReactNode }) {
    const [videoArticleDeLaSaison, setVideoArticleDeLaSaison] = useState<VideoSelectType[]>([]);

    useEffect(() => {
        getArticleDeLaSaison().then((v) => {
            if (v) setVideoArticleDeLaSaison([v]);
            else setVideoArticleDeLaSaison([]);
        })
    },[]);

    return (
        <ArticleDeLaSaisonContext.Provider value={{video: videoArticleDeLaSaison, setVideo: setVideoArticleDeLaSaison}}>
            {children}
        </ArticleDeLaSaisonContext.Provider>
    );
}

