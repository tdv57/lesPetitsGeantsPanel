import type { ImageSelect, RawMarque } from "../types/ImageType";
import { mapAge } from "./UtilsMapper";

export function mapMarqueFromSupabase(s: RawMarque): ImageSelect {
  return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapPelucheFromSupabase(s: RawMarque): ImageSelect {
  return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapJouetFromSupabase(s: RawMarque): ImageSelect {
  return {
        id: s.id,
        url: s.url,
        age:(s.age && s.type_age) ? mapAge(s.age, s.type_age as "ANS" | "MOIS") : undefined,
        description: s.description ? s.description : "",
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapJeuDeSocieteFromSupabase(s: RawMarque): ImageSelect {
  return {
        id: s.id,
        url: s.url,
        age:(s.age && s.type_age) ? mapAge(s.age, s.type_age as "ANS" | "MOIS") : undefined,
        description: s.description ? s.description : "",
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

