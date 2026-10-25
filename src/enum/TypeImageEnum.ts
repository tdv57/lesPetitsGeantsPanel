import { createListCollection } from '@chakra-ui/react';
import { typeArticleCollection, TypeArticleEnumValue, typeArticleMapping } from './TypeArticleEnum';

export const TypeImageEnumValue = {
    MARQUE: 'MARQUE',
    ...TypeArticleEnumValue,
} as const;

export type TypeImageEnum = (typeof TypeImageEnumValue)[keyof typeof TypeImageEnumValue];

export const typeImageCollection = createListCollection<{ label: string; value: TypeImageEnum }>({
    items: [{ label: 'Marques', value: TypeImageEnumValue.MARQUE }, ...typeArticleCollection],
});

export const typeImageMapping = createListCollection<{ label: TypeImageEnum; value: string }>({
    items: [{ label: TypeImageEnumValue.MARQUE, value: 'Marques' }, ...typeArticleMapping],
});
