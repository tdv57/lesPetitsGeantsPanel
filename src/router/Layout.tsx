import { useLocation } from "react-router-dom";
import VideosDuMoment from "../components/hero/VideosDuMoment";
import ArticleDeLaSaison from "../components/hero/ArticleDeLaSaison";

export function Layout() {
    const location = useLocation();
    
    return (
        <>
            <div style={{display: location.pathname==="/videos-du-moment" ? "block" : "none" }}>
                <VideosDuMoment/>
            </div>
            <div style={{display: location.pathname==="/article-de-la-saison" ? "block" : "none" }}>    
                <ArticleDeLaSaison/>
            </div>
        </>
    );
}