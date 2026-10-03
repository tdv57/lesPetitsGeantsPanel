import { GenreEnumValue, type GenreEnum } from '../enum/GenreEnum';
import { ThemeEnumValue, type ThemeEnum } from '../enum/ThemeEnum';

export function isThemeEnum(value: string | null): value is ThemeEnum {
    return Object.values(ThemeEnumValue).includes(value as ThemeEnum);
}

export function isGenreEnum(value: string | null): value is GenreEnum {
    return Object.values(GenreEnumValue).includes(value as GenreEnum);
}
