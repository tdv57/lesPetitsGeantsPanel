import { useContext } from "react";
import { ImageContext } from "../components/context/Image";

export function useImages() {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImages doit être utilisé à l'intérieur d'un ImagesProvider");
    }
    return context;
}