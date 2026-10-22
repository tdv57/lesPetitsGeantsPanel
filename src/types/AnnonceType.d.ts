import { z } from "zod";
import type { D1AnnonceInsertSchema, D1AnnonceSelectSchema } from "../schema/AnnonceSchema";
import type { TypeMediaEnum } from "../enum/TypeMediaEnum";

export type AnnonceSelect = z.infer<typeof D1AnnonceSelectSchema>;
export type D1AnnonceInsert = z.infer<typeof D1AnnonceInsertSchema>;
export type D1AnnonceUpdate = D1AnnonceInsert;

export type AnnonceCreate = {
    file: File, 
    mediaType: TypeMediaEnum,
    commentaire: string,
    redirectionLink?: string 
}

export type AnnonceUpdate = {
    id: number 
    file?: File, 
    mediaType: TypeMediaEnum, 
    commentaire: string,
    redirectionLink?: string, 
}
