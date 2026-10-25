export const ThemeEnumValue = {
    POLICIER: 'POLICIER',
    POMPIER: 'POMPIER',
    COSMONOTE: 'COSMONOTE',
    PILOTE: 'PILOTE',
    ANIMAUX: 'ANIMAUX',
    PIRATE: 'PIRATE',
    SIRENE: 'SIRENE',
    CAPE: 'CAPE',
    MEDIEVAL: 'MEDIEVAL',
    FANTASTIQUE: 'FANTASTIQUE',
    TOUS: 'TOUS',
} as const;

export type ThemeEnum = (typeof ThemeEnumValue)[keyof typeof ThemeEnumValue];
