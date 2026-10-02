import { createListCollection } from '@chakra-ui/react';
import type { GenreEnum } from '../enum/GenreEnum';
import type { ThemeEnum } from '../enum/ThemeEnum';

export const TYPE_IMAGE_VALUE = {
    MARQUE: 'MARQUE',
    PELUCHE: 'PELUCHE',
    JEU_DE_SOCIETE: 'JEU DE SOCIETE',
    JOUET: 'JOUET',
    LOISIR_CREATIF: 'LOISIR CREATIF',
    DEGUISEMENT: 'DEGUISEMENT',
    LIVRE: 'LIVRE',
    EDITEUR: 'EDITEUR',
} as const;

export type TYPE_IMAGE_TYPE = (typeof TYPE_IMAGE_VALUE)[keyof typeof TYPE_IMAGE_VALUE];

export const typeImageCollection = createListCollection<{ label: string; value: TYPE_IMAGE_TYPE }>({
    items: [
        { label: 'Marque', value: TYPE_IMAGE_VALUE.MARQUE },
        { label: 'Jouet', value: TYPE_IMAGE_VALUE.JOUET },
        { label: 'Jeu de société', value: TYPE_IMAGE_VALUE.JEU_DE_SOCIETE },
        { label: 'Peluche', value: TYPE_IMAGE_VALUE.PELUCHE },
        { label: 'Loisir créatif', value: TYPE_IMAGE_VALUE.LOISIR_CREATIF },
        { label: 'Déguisement', value: TYPE_IMAGE_VALUE.DEGUISEMENT },
        { label: 'Livre', value: TYPE_IMAGE_VALUE.LIVRE },
        { label: 'Editeur', value: TYPE_IMAGE_VALUE.EDITEUR },
    ],
});

export const typeImageMapping = createListCollection<{ label: TYPE_IMAGE_TYPE; value: string }>({
    items: [
        { label: TYPE_IMAGE_VALUE.MARQUE, value: 'Marque' },
        { label: TYPE_IMAGE_VALUE.JOUET, value: 'Jouet' },
        { label: TYPE_IMAGE_VALUE.JEU_DE_SOCIETE, value: 'Jeu de société' },
        { label: TYPE_IMAGE_VALUE.PELUCHE, value: 'Peluche' },
        { label: TYPE_IMAGE_VALUE.LOISIR_CREATIF, value: 'Loisir créatif' },
        { label: TYPE_IMAGE_VALUE.DEGUISEMENT, value: 'Déguisement' },
        { label: TYPE_IMAGE_VALUE.LIVRE, value: 'Livre' },
        { label: TYPE_IMAGE_VALUE.EDITEUR, value: 'Editeur' },
    ],
});

export type RawMarque = {
    id: number;
    created_at: string;
    url: string;
    description: string | null;
    age: number | null;
    type_age: string | null;
    marque: string;
    code: string;
    type_image: TYPE_IMAGE_TYPE;
};

export type MarqueCreate = {
    marque: string;
    image: File;
};

export type JouetCreate = {
    typeAge?: string;
    age?: string;
    description: string;
    image: File;
};

export type JeuDeSocieteCreate = {
    typeAge?: string;
    age?: string;
    description: string;
    image: File;
};

export type PelucheCreate = {
    marque: string;
    image: File;
};

export type ImageCreate = {
    typeImage: TYPE_IMAGE_TYPE;
    marque?: string;
    typeAge?: string;
    age?: string;
    description?: string;
    image: File;
};

export type ImageSelect = {
    url: string;
    id: number;
    typeImage: TYPE_IMAGE_TYPE;
    marque?: string;
    age?: string;
    description?: string;
    createdAt: Date;
    theme?: ThemeEnum;
    genre?: GenreEnum;
    editeur?: string;
};
