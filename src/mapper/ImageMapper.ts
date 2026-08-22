import type { IMAGE_SELECT_TYPE, ImageSelect, JeuDeSocieteSelect, JouetSelect, MarqueSelect, PelucheSelect, RawMarque } from "../types/ImageType";
import { mapAge } from "./UtilsMapper";

export function isMarqueSelect(s: IMAGE_SELECT_TYPE): s is MarqueSelect {
  console.log("function: ", s);
  return s.typeImage === "MARQUE";
}

export function isJouetSelect(s: IMAGE_SELECT_TYPE): s is JouetSelect {
  return s.typeImage === "JOUET";
}

export function isJeuDeSocieteSelect(s: IMAGE_SELECT_TYPE): s is JeuDeSocieteSelect {
  return s.typeImage === "JEU DE SOCIETE";
}

export function isPelucheSelect(s: IMAGE_SELECT_TYPE): s is PelucheSelect {
  return s.typeImage === "PELUCHE";
}

export function mapMarqueFromSupabase(s: RawMarque): MarqueSelect {
  return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapPelucheFromSupabase(s: RawMarque): PelucheSelect {
  return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapJouetFromSupabase(s: RawMarque): JouetSelect {
  return {
        id: s.id,
        url: s.url,
        age:(s.age && s.type_age) ? mapAge(s.age, s.type_age as "ANS" | "MOIS") : undefined,
        description: s.description ? s.description : "",
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapJeuDeSocieteFromSupabase(s: RawMarque): JeuDeSocieteSelect {
  return {
        id: s.id,
        url: s.url,
        age:(s.age && s.type_age) ? mapAge(s.age, s.type_age as "ANS" | "MOIS") : undefined,
        description: s.description ? s.description : "",
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}


export function mapToPelucheSelect(image: ImageSelect) : PelucheSelect{
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        marque: image.marque ? image.marque : "",
        createdAt: image.createdAt
    }
}

export function mapToJouetSelect(image: ImageSelect) : JouetSelect{
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        age: image.age ? image.age : "",
        description : image.description ? image.description : "",
        createdAt: image.createdAt
    }
}

export function mapToJeuDeSocieteSelect(image: ImageSelect) : JeuDeSocieteSelect{
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        age: image.age ? image.age : "",
        description : image.description ? image.description : "",
        createdAt: image.createdAt
    }
}

export function mapToMarqueSelect(image: ImageSelect) : MarqueSelect{
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        marque: image.marque ? image.marque : "",
        createdAt: image.createdAt
    }
}