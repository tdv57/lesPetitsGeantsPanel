import type { AnnonceCreate, AnnonceUpdate, D1AnnonceInsert, D1AnnonceUpdate } from "../types/AnnonceType";

export function mapAnnonceCreateToD1AnnonceInsert(    
    s: AnnonceCreate,
    url: string,
    code: string,
) : D1AnnonceInsert {
    return {
        code, 
        url,
        mediaType: s.mediaType,
        commentaire: s.commentaire,
        redirectionLink: s.redirectionLink,
    };
}

export function mapAnnonceUpdateToD1AnnonceUpdate(
    s: AnnonceUpdate,
    url: string,
    code: string,
): D1AnnonceUpdate {
    return {
        code, 
        url,
        mediaType: s.mediaType,
        commentaire: s.commentaire,
        redirectionLink: s.redirectionLink,
    };
}

