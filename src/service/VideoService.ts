import { supabase, TABLE_VIDEO } from './SupabaseService';
import {
    uploadVideo, 
    deleteVideo, 
    R2_VIDEO_PUBLIC_URL
} from './R2Service';

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

const ARTICLE_DE_LA_SAISON_CODE = "ArticleDeLaSaison";

export async function getArticleDeLaSaison() : Promise<VideoSelectType | null>{
    const {data, error} = await supabase.from(TABLE_VIDEO).select().eq('code', ARTICLE_DE_LA_SAISON_CODE);
    if (error ) {
        return null;
    }
    if (data.length > 0) {
        const articleDeLaSaison = data[0];
        console.log("getArticleDeLaSaison : ", articleDeLaSaison);
        return {
            url: articleDeLaSaison.url,
            description: articleDeLaSaison.description,
            age: getAge(parseInt(articleDeLaSaison.age), articleDeLaSaison.typeAge),
            id: articleDeLaSaison.id,
            created_at: articleDeLaSaison.created_at
        }
    }
    return null;

}

export async function getVideosDuMoment() : Promise<VideoSelectType[] | null>{
    const {data, error} = await supabase.from(TABLE_VIDEO).select();
    if (error ) {
        return null;
    }    
    return data.filter((d) => d.code != ARTICLE_DE_LA_SAISON_CODE).map((d) => {
        return {
            url: d.url,
            description: d.description,
            age: getAge(parseInt(d.age), d.typeAge),
            id: d.id,
            created_at: d.created_at
        };
    })
}

export async function addVideosDuMoment({description, age, typeAge, video}: VideoCreateType): Promise<VideoSelectType | null>{
    const code = crypto.randomUUID(); 
    const url = R2_VIDEO_PUBLIC_URL + "/" + code;
    const {data, error} = await supabase.from(TABLE_VIDEO).insert({url, description, age, type_age: typeAge, code}).select();
    if (error) return null;
     const newVideo = data[0];
    const res = await uploadVideo(video, code);
    if (!res.success) {
        console.log("addVideosDuMoment R2 error: ", res.error);
        await supabase.from(TABLE_VIDEO).delete().eq('id', newVideo.id);
        return null;
    }
    const { data: { user } } = await supabase.auth.getUser()
    console.log("Résultat upload -> data:", data, "error:", res.error);
    console.log("code généré :", code); 
    console.log("user = ", user);
    console.log("newVideo: ", newVideo)
    return {
        url: newVideo.url,
        description: newVideo.description,
        age: getAge(newVideo.age, newVideo.typeAge),
        id: newVideo.id,
        created_at: newVideo.created_at
    };
}   

export async function deleteVideosDuMoment(id: number) {
    const {data, error} = await supabase.from(TABLE_VIDEO).select().eq('id', id);
    if (error) return false;
    const res = await deleteVideo(data[0].code);
    if (!res.success) {
        console.log("deleteVideosDuMoment R2 error: ", res.error);
        return false;
    }
    const {error: dbError} = await supabase.from(TABLE_VIDEO).delete().eq('id', id);
    if (dbError) return false;
    return true;
}

export async function deleteArticleDeLaSaison() {
    const {data, error} = await supabase.from(TABLE_VIDEO).select().eq('code', ARTICLE_DE_LA_SAISON_CODE);
    if (error) return false;
    const res = await deleteVideo(data[0].code);
    if (!res.success) {
        console.log("deleteArticleDeLaSaison R2 error: ", res.error);
        return false;
    } 
    const {error: dbError} = await supabase.from(TABLE_VIDEO).delete().eq('code', ARTICLE_DE_LA_SAISON_CODE);
    if (dbError) return false;
    return true;
}


export async function replaceArticleDeLaSaison({description, age, typeAge, video}: VideoCreateType) : Promise<VideoSelectType | null>{
    const { data: { session } } = await supabase.auth.getSession();
    console.log("Session au moment du replace:", session);
    const {data, error} =  await supabase.from(TABLE_VIDEO).select().eq('code', ARTICLE_DE_LA_SAISON_CODE);
    if (error) {
        console.log("ReplaceArticleDeLaSaison, erreur: ", error);
        return null;
    }
    if (data.length > 0) {
        const {error: dbError} = await supabase.from(TABLE_VIDEO).delete().eq('code', ARTICLE_DE_LA_SAISON_CODE);
        const res = await deleteVideo(data[0].code);
        if (res.error || dbError) {
            console.log("ReplaceArticleDeLaSaison, erreur storage: ", res.error);
            console.log("ReplaceArticleDeLaSaison, erreur db: ", dbError);
            return null;
        } 
    }

    const code = ARTICLE_DE_LA_SAISON_CODE;
    const url = R2_VIDEO_PUBLIC_URL + "/" + code;
    const {data: dataInsert, error: errorInsert} = await supabase.from(TABLE_VIDEO).insert({url, description, age, type_age: typeAge, code}).select();
    if (errorInsert) return null;
     const newVideo = dataInsert[0];
    const res = await uploadVideo(video, code);
    if (!res.success) {
        await supabase.from(TABLE_VIDEO).delete().eq('id', newVideo.id);
        return null;
    }
    return {
        url: newVideo.url,
        description: newVideo.description,
        age: newVideo.age,
        id: newVideo.id,
        created_at: newVideo.created_at
    };
}

function getAge(age: number, typeAge: "ANS" | "MOIS") : string {
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