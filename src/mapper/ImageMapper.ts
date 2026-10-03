import type { GenreEnum } from '../enum/GenreEnum';
import type { ThemeEnum } from '../enum/ThemeEnum';
import {
    type ImageCreate,
    type ImageSelect,
    type RawImageCreate,
    type RawImageSelect,
} from '../types/ImageType';
import { mapAge } from './AgeMapper';
import { isGenreEnum, isThemeEnum } from './EnumMapper';

export function mapRawImageSelectToImageSelect(s: RawImageSelect): ImageSelect {
    return {
        url: s.url,
        id: s.id,
        typeImage: s.type_image,
        marque: s.marque,
        age: s.age && s.type_age ? mapAge(s.age, s.type_age as 'ANS' | 'MOIS') : undefined,
        description: s.description ? s.description : undefined,
        createdAt: new Date(s.created_at),
        theme: isThemeEnum(s.theme) ? (s.theme as ThemeEnum) : undefined,
        genre: isGenreEnum(s.genre) ? (s.genre as GenreEnum) : undefined,
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
    };
}
