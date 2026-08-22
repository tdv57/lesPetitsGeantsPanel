import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ImageSelect, JeuDeSocieteSelect, JouetSelect, MarqueSelect, PelucheSelect } from "../../types/ImageType";
import {getImageByType } from "../../service/ImageService";
import { mapToJeuDeSocieteSelect, mapToJouetSelect, mapToMarqueSelect, mapToPelucheSelect } from "../../mapper/ImageMapper";

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
        getImageByType("MARQUE"),
        getImageByType("JOUET"),
        getImageByType("JEU DE SOCIETE"),
        getImageByType("PELUCHE")
      ]);

      const [marquesRes, jouetsRes, jeuDeSocietesRes, pelucheRes] = results;

      setImages({
        "MARQUE": marquesRes.status === "fulfilled" ? marquesRes.value.map((value) => mapToMarqueSelect(value)) : [],
        "JOUET": jouetsRes.status === "fulfilled" ? jouetsRes.value.map((value) => mapToJouetSelect(value)) : [],
        "JEU DE SOCIETE": jeuDeSocietesRes.status === "fulfilled" ? jeuDeSocietesRes.value.map((value) => mapToJeuDeSocieteSelect(value)) : [],
        "PELUCHE": pelucheRes.status === "fulfilled" ? pelucheRes.value.map((value) => mapToPelucheSelect(value)) : [],
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