export const GenreEnumValue = {
    GARCON: 'GARCON',
    FILLE: 'FILLE',
    TOUS: 'TOUS',
} as const;

export type GenreEnum = (typeof GenreEnumValue)[keyof typeof GenreEnumValue];
