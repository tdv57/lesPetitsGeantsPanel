export const ChargementStatut = {
    Inactif: 'INACTIF',
    EnAttente: 'EN_ATTENTE',
    Terminee: 'TERMINEE',
} as const;

export type ChargementStatutEnum = (typeof ChargementStatut)[keyof typeof ChargementStatut];
