export const ThemeEnumValue = {
    POLICIER: 'POLICIER',
    POMPIER: 'POMPIER',
    MEDIEVAL: 'MEDIEVAL',
    FANTASTIQUE: 'FANTASTIQUE',
} as const;

export type ThemeEnum = (typeof ThemeEnumValue)[keyof typeof ThemeEnumValue];
