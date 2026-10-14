import { createListCollection } from '@chakra-ui/react';

export const TypeArticleEnumValue = {
    PELUCHE: 'PELUCHE',
    JEU_DE_SOCIETE: 'JEU DE SOCIETE',
    JOUET: 'JOUET',
    LOISIR_CREATIF: 'LOISIR CREATIF',
    DEGUISEMENT: 'DEGUISEMENT',
    LIVRE: 'LIVRE',
    BAGAGERIE: 'BAGAGERIE',
    BIJOUX: 'BIJOUX',
    DECORATION: 'DECORATION',
} as const;

export type TypeArticleEnum = (typeof TypeArticleEnumValue)[keyof typeof TypeArticleEnumValue];

export const typeArticleCollection = createListCollection<{
    label: string;
    value: TypeArticleEnum;
}>({
    items: [
        { label: 'Jouets', value: TypeArticleEnumValue.JOUET },
        { label: 'Jeux de société', value: TypeArticleEnumValue.JEU_DE_SOCIETE },
        { label: 'Peluches', value: TypeArticleEnumValue.PELUCHE },
        { label: 'Loisirs créatifs', value: TypeArticleEnumValue.LOISIR_CREATIF },
        { label: 'Déguisements', value: TypeArticleEnumValue.DEGUISEMENT },
        { label: 'Livres', value: TypeArticleEnumValue.LIVRE },
        { label: 'Bagageries', value: TypeArticleEnumValue.BAGAGERIE },
        { label: 'Bijoux', value: TypeArticleEnumValue.BIJOUX },
        { label: 'Décorations', value: TypeArticleEnumValue.DECORATION },
    ],
});

export const typeArticleMapping = createListCollection<{ label: TypeArticleEnum; value: string }>({
    items: [
        { label: TypeArticleEnumValue.JOUET, value: 'Jouets' },
        { label: TypeArticleEnumValue.JEU_DE_SOCIETE, value: 'Jeux de société' },
        { label: TypeArticleEnumValue.PELUCHE, value: 'Peluches' },
        { label: TypeArticleEnumValue.LOISIR_CREATIF, value: 'Loisirs créatifs' },
        { label: TypeArticleEnumValue.DEGUISEMENT, value: 'Déguisements' },
        { label: TypeArticleEnumValue.LIVRE, value: 'Livres' },
        { label: TypeArticleEnumValue.BAGAGERIE, value: 'Bagageries' },
        { label: TypeArticleEnumValue.BIJOUX, value: 'Bijoux' },
        { label: TypeArticleEnumValue.DECORATION, value: 'Décorations' },
    ],
});
