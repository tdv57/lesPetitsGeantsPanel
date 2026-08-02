import { createListCollection } from "@chakra-ui/react";

export type TYPE_IMAGE="MARQUE" | "JOUET" | "JEU DE SOCIETE" | "PELUCHE";

export const typeImageCollection = createListCollection<{label: string, value:TYPE_IMAGE}>(({
    items: [
        {label: "Marque", value: "MARQUE"},
        {label: "Jouet", value: "JOUET"},
        {label: "Jeu de société", value: "JEU DE SOCIETE"},
        {label: "Peluche", value: "PELUCHE"}
    ]
}));