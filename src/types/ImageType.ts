import type { GenreEnum } from '../enum/GenreEnum';
import type { ThemeEnum } from '../enum/ThemeEnum';
import type { TypeAgeEnum } from '../enum/TypeAgeEnum';
import type { TypeImageEnum, TypeImageEnumValue } from '../enum/TypeImageEnum';

export type ArticleTypeImage =
    | typeof TypeImageEnumValue.JOUET
    | typeof TypeImageEnumValue.JEU_DE_SOCIETE
    | typeof TypeImageEnumValue.PELUCHE
    | typeof TypeImageEnumValue.LOISIR_CREATIF
    | typeof TypeImageEnumValue.LIVRE
    | typeof TypeImageEnumValue.BAGAGERIE
    | typeof TypeImageEnumValue.BIJOUX
    | typeof TypeImageEnumValue.DECORATION
    | typeof TypeImageEnumValue.DEGUISEMENT;

export type RawImageSelect = {
    id: number;
    created_at: string;
    url: string;
    description: string | null;
    age: number | null;
    type_age: string | null;
    marque: string;
    code: string;
    type_image: TypeImageEnum;
    genre: string | null;
    theme: string | null;
    is_editeur: boolean | null;
    id_fou: number | null;
    id_art: number | null;
};

export interface RawImageCreate {
    url: string;
    description: string | null;
    age: number | null;
    type_age: string | null;
    marque: string;
    code: string;
    type_image: TypeImageEnum;
    genre: string | null;
    theme: string | null;
    is_editeur: boolean | null;
    id_fou: number | null;
    id_art: number | null;
}

export interface RawImageUpdate extends RawImageCreate {
    id: number;
}

interface ImageBaseCreate {
    image: File;
}

export interface MarqueCreate extends ImageBaseCreate {
    typeImage: typeof TypeImageEnumValue.MARQUE;
    marque: string;
    isEditeur: boolean;
    idFou: number;
}

interface ArticleBaseCreate extends ImageBaseCreate {
    typeAge: TypeAgeEnum;
    age: string;
    description: string;
    marque: string;
    image: File;
    idArt: number;
}

export interface ArticleCreate extends ArticleBaseCreate {
    typeImage: ArticleTypeImage;
}

export interface DeguisementCreate extends ArticleCreate {
    genre: GenreEnum;
    theme: ThemeEnum;
}

export type ImageCreate = {
    typeImage: TypeImageEnum;
    marque?: string;
    typeAge?: string;
    age?: string;
    description?: string;
    image: File;
    theme?: ThemeEnum;
    genre?: GenreEnum;
    isEditeur: boolean | null;
    idFou: number | null;
    idArt: number | null;
};

export type ImageUpdate = {
    id: number;
    typeImage: TypeImageEnum;
    marque?: string;
    typeAge?: string;
    age?: string;
    description?: string;
    image?: File;
    theme?: ThemeEnum;
    genre?: GenreEnum;
    isEditeur: boolean | null;
    idFou: number | null;
    idArt: number | null;
};

export type ImageSelect = {
    url: string;
    code: string;
    id: number;
    typeImage: TypeImageEnum;
    marque?: string;
    age?: string;
    typeAge?: TypeAgeEnum;
    description?: string;
    createdAt: Date;
    theme?: ThemeEnum;
    genre?: GenreEnum;
    isEditeur: boolean | null;
    idFou: number | null;
    idArt: number | null;
};
