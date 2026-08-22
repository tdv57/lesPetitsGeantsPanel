import { createListCollection } from "@chakra-ui/react";

export function mapAge(age: number | null , typeAge: "ANS" | "MOIS" | null) : string {
    if( !age || age < 0 || !typeAge || (typeAge !== "ANS" && typeAge !== "MOIS")) {
        return "";
    }
    if (typeAge === "ANS") {
        if (age === 1 || age === 0) {
            return "Dès " + age + " an";
        } else {
            return "Dès " + age + " ans";
        }
    }
    else if (typeAge === "MOIS") {
        return "Dès " + age + " mois";
    }
    return ""; 
}

export const typeAgeCollection = createListCollection({
        items: [
            {label: "Ans", value: "ANS"},
            {label: "Mois", value: "MOIS"},
        ]
    });
