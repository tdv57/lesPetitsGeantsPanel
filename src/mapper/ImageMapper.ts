import type { IMAGE_SELECT_TYPE, JeuDeSocieteSelect, JouetSelect, MarqueSelect, PelucheSelect, RawMarque } from "../types/ImageType";
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

