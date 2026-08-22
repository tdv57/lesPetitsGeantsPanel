import { createContext, useEffect, useState, type ReactNode } from "react";
import type { JeuDeSocieteSelect, JouetSelect, MarqueSelect, PelucheSelect } from "../../types/ImageType";
import { getImage } from "../../service/ImageService";

type ImageContextType = {
    images : {
        "MARQUE": MarqueSelect[],
        "JOUET" : JouetSelect[],
        "JEU DE SOCIETE": JeuDeSocieteSelect[],
        "PELUCHE": PelucheSelect[]
    };
    setImages: React.Dispatch<React.SetStateAction<{
        MARQUE: MarqueSelect[];
        JOUET: JouetSelect[];
        "JEU DE SOCIETE": JeuDeSocieteSelect[];
        "PELUCHE": PelucheSelect[];
    }>>;
}

export const ImageContext = createContext<ImageContextType | null>(null);

export function ImageProvider({children}: { children: ReactNode }){
    const [images, setImages] = useState<{
        "MARQUE": MarqueSelect[],
        "JOUET": JouetSelect[],
        "JEU DE SOCIETE": JeuDeSocieteSelect[],
        "PELUCHE": PelucheSelect[]
    }>({
        "MARQUE": [],
        "JOUET" : [],
        "JEU DE SOCIETE": [],
        "PELUCHE": []
    });

    useEffect(() => {
    async function loadAll() {

      const results = await Promise.allSettled([
        getImage("MARQUE"),
        getImage("JOUET"),
        getImage("JEU DE SOCIETE"),
        getImage("PELUCHE")
      ]);

      const [marquesRes, jouetsRes, jeuDeSocietesRes, pelucheRes] = results;

      setImages({
        "MARQUE": marquesRes.status === "fulfilled" ? marquesRes.value : [],
        "JOUET": jouetsRes.status === "fulfilled" ? jouetsRes.value : [],
        "JEU DE SOCIETE": jeuDeSocietesRes.status === "fulfilled" ? jeuDeSocietesRes.value : [],
        "PELUCHE": pelucheRes.status === "fulfilled" ? pelucheRes.value : [],
      });
    }
    loadAll();
    }, []);

    return (
        <ImageContext.Provider value={{images, setImages}}>
            {children}
        </ImageContext.Provider>
    );
}