import type { GenreEnum } from '../enum/GenreEnum';
import type { ThemeEnum } from '../enum/ThemeEnum';
import type { TypeAgeEnum } from '../enum/TypeAgeEnum';
import {
    type ImageCreate,
    type ImageSelect,
    type ImageUpdate,
    type RawImageCreate,
    type RawImageSelect,
} from '../types/ImageType';
import { isGenreEnum, isThemeEnum } from './EnumMapper';

export function mapRawImageSelectToImageSelect(s: RawImageSelect): ImageSelect {
    return {
        url: s.url,
        code: s.code,
        id: s.id,
        typeImage: s.type_image,
        marque: s.marque,
        age: s.age ? String(s.age) : undefined,
        typeAge: s.type_age ? (s.type_age as TypeAgeEnum) : undefined,
        description: s.description ? s.description : undefined,
        createdAt: new Date(s.created_at),
        theme: isThemeEnum(s.theme) ? (s.theme as ThemeEnum) : undefined,
        genre: isGenreEnum(s.genre) ? (s.genre as GenreEnum) : undefined,
        isEditeur: s.is_editeur,
        idFou: s.id_fou,
        idArt: s.id_art,
    };
}

export function mapImageCreateToRawImageCreate(
    s: ImageCreate,
    url: string,
    code: string,
): RawImageCreate {
    return {
        url,
        description: s.description ? s.description : null,
        age: s.age ? parseInt(s.age) : null,
        type_age: s.typeAge ? s.typeAge : null,
        marque: s.marque ? s.marque : '',
        code,
        type_image: s.typeImage,
        genre: s.genre ? s.genre : null,
        theme: s.theme ? s.theme : null,
        is_editeur: s.isEditeur,
        id_fou: s.idFou,
        id_art: s.idArt,
    };
}

export function mapImageUpdateToRawImageCreate(
    s: ImageUpdate,
    url: string,
    code: string,
): RawImageCreate {
    return {
        url,
        description: s.description ? s.description : null,
        age: s.age ? parseInt(s.age) : null,
        type_age: s.typeAge ? s.typeAge : null,
        marque: s.marque ? s.marque : '',
        code,
        type_image: s.typeImage,
        genre: s.genre ? s.genre : null,
        theme: s.theme ? s.theme : null,
        is_editeur: s.isEditeur,
        id_fou: s.idFou,
        id_art: s.idArt,
    };
}
