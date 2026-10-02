import { TYPE_IMAGE_VALUE, type ImageSelect, type RawMarque } from '../types/ImageType';
import { mapAge } from './UtilsMapper';

export function mapMarqueFromSupabase(s: RawMarque): ImageSelect {
    return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    };
}

export function mapPelucheFromSupabase(s: RawMarque): ImageSelect {
    return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    };
}

export function mapJouetFromSupabase(s: RawMarque): ImageSelect {
    return {
        id: s.id,
        url: s.url,
        age: s.age && s.type_age ? mapAge(s.age, s.type_age as 'ANS' | 'MOIS') : undefined,
        description: s.description ? s.description : '',
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    };
}

export function mapJeuDeSocieteFromSupabase(s: RawMarque): ImageSelect {
    return {
        id: s.id,
        url: s.url,
        age: s.age && s.type_age ? mapAge(s.age, s.type_age as 'ANS' | 'MOIS') : undefined,
        description: s.description ? s.description : '',
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    };
}

export function mapEditeurFromSupabase(s: RawMarque): ImageSelect {
    return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    };
}

export function mapLoisirCreatifFromSupabase(s: RawMarque): ImageSelect {
    return {
        id: s.id,
        url: s.url,
        age: s.age && s.type_age ? mapAge(s.age, s.type_age as 'ANS' | 'MOIS') : undefined,
        description: s.description ? s.description : '',
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    };
}

export function mapLivreFromSupabase(s: RawMarque): ImageSelect {
    return {
        id: s.id,
        url: s.url,
        age: s.age && s.type_age ? mapAge(s.age, s.type_age as 'ANS' | 'MOIS') : undefined,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    };
}

export function mapImageFromSupabase(s: RawMarque): ImageSelect {
    switch (s.type_image) {
        case TYPE_IMAGE_VALUE.MARQUE:
            return mapMarqueFromSupabase(s);
        case TYPE_IMAGE_VALUE.JEU_DE_SOCIETE:
            return mapJeuDeSocieteFromSupabase(s);
        case TYPE_IMAGE_VALUE.JOUET:
            return mapJouetFromSupabase(s);
        case TYPE_IMAGE_VALUE.PELUCHE:
            return mapPelucheFromSupabase(s);
        case TYPE_IMAGE_VALUE.EDITEUR:
            return mapEditeurFromSupabase(s);
        case TYPE_IMAGE_VALUE.LOISIR_CREATIF:
            return mapLoisirCreatifFromSupabase(s);
        case TYPE_IMAGE_VALUE.LIVRE:
            return mapLivreFromSupabase(s);
        default: {
            console.error('mapImageFromSupabase type image inconnu : ' + s.type_image);
            throw new Error('no such type image ' + s.type_image);
        }
    }
}
