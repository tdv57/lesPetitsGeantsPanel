import { createListCollection } from '@chakra-ui/react';

export const TYPE_IMAGE_VALUE = {
    MARQUE: 'MARQUE',
    PELUCHE: 'PELUCHE',
    JEU_DE_SOCIETE: 'JEU DE SOCIETE',
    JOUET: 'JOUET',
} as const;

export type TYPE_IMAGE_TYPE = (typeof TYPE_IMAGE_VALUE)[keyof typeof TYPE_IMAGE_VALUE];

export const typeImageCollection = createListCollection<{ label: string; value: TYPE_IMAGE_TYPE }>({
    items: [
        { label: 'Marque', value: 'MARQUE' },
        { label: 'Jouet', value: 'JOUET' },
        { label: 'Jeu de société', value: 'JEU DE SOCIETE' },
        { label: 'Peluche', value: 'PELUCHE' },
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
};
