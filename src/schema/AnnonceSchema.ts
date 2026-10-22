import { z } from "zod";
import { TypeMediaEnumValue } from "../enum/TypeMediaEnum";

export const D1AnnonceSelectSchema = z.object({
  id: z.number().int(),
  code: z.string(),
  url: z.url(),
  mediaType: z.enum(TypeMediaEnumValue),
  commentaire: z.string(),
  redirectionLink: z.url().optional(),
  createdAt: z.coerce.date()
})

const urlSeTermineParCode = (a: {url: string; code: string}) => {
  try {
    return new URL(a.url).pathname.split('/').filter(Boolean).pop() === a.code;
  } catch {
    return false;
  }
}

export const D1AnnonceInsertSchema = D1AnnonceSelectSchema.omit({
  id: true,
  createdAt: true
}).refine(urlSeTermineParCode, {
    message: "L'url doit se terminer par le code",
    path: ['url'],
});

export const D1AnnonceUpdateSchema = D1AnnonceInsertSchema;