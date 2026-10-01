export type VideoSelectType = {
    id: number,
    description: string,
    age: string, 
    url: string
    created_at : string,
}

export type VideoCreateType = {
    description: string,
    age: number | null,
    typeAge: "ANS" | "MOIS" | null,
    video: File
}