export const ChargementStatutEnumValue = {
    Inactif: 'INACTIF',
    EnAttente: 'EN_ATTENTE',
    Terminee: 'TERMINEE',
} as const;

export type ChargementStatutEnum = (typeof ChargementStatutEnumValue)[keyof typeof ChargementStatutEnumValue];
