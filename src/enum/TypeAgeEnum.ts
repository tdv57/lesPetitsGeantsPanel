import { createListCollection } from '@chakra-ui/react';

export const TypeAgeEnumValue = {
    ANS: 'ANS',
    MOIS: 'MOIS',
} as const;

export type TypeAgeEnum = (typeof TypeAgeEnumValue)[keyof typeof TypeAgeEnumValue];

export const typeAgeCollection = createListCollection({
    items: [
        { label: 'Ans', value: TypeAgeEnumValue.ANS },
        { label: 'Mois', value: TypeAgeEnumValue.MOIS },
    ],
});
