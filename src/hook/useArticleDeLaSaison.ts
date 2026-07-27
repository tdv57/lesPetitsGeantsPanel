import { useContext } from "react";
import { ArticleDeLaSaisonContext } from "../components/context/ArticleDeLaSaison";

export function useArticleDeLaSaison() {
    const context = useContext(ArticleDeLaSaisonContext);
    if (!context) {
        throw new Error("useVideos doit être utilisé à l'intérieur d'un VideosProvider");
    }
    return context;
}