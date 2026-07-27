import { supabase, BUCKET_URL, BUCKET_NAME, TABLE_VIDEOS_DU_MOMENT, TABLE_ARTICLE_DE_LA_SAISON } from './SupabaseService';

export type VideoSelectType = {
    id: number,
    description: string,
    age: string, 
    url: string
}

export type VideoCreateType = {
    description: string,
    age: string,
    video: File
}

export async function getVideoTest() : Promise<string | null>{
    const {data, error} = await supabase.from(TABLE_VIDEOS_DU_MOMENT).select();
    if (error) {
        return null;
    }
    console.log(data);
    const {data: urlData}  = await supabase.storage.from(BUCKET_URL).getPublicUrl("Fal.mp4");
    return urlData.publicUrl;
}

export async function getArticleDeLaSaison() : Promise<VideoSelectType | null>{
    const {data, error} = await supabase.from(TABLE_ARTICLE_DE_LA_SAISON).select();
    if (error ) {
        return null;
    }
    if (data.length > 0) {
        const articleDeLaSaison = data[0];
        console.log("getArticleDeLaSaison : ", articleDeLaSaison)
        const {data: urlData} = await supabase.storage.from(BUCKET_NAME).getPublicUrl(articleDeLaSaison.video_url);
        return {
            url: urlData.publicUrl, 
            description: articleDeLaSaison.description,
            age: articleDeLaSaison.age,
            id: articleDeLaSaison.id
        }
    }
    return null;

}

export async function getVideosDuMoment() : Promise<VideoSelectType[] | null>{
    const {data, error} = await supabase.from(TABLE_VIDEOS_DU_MOMENT).select();
    if (error ) {
        return null;
    }    
    return data.map((d) => {
        return {
            url: supabase.storage.from(BUCKET_NAME).getPublicUrl(d.video_url).data.publicUrl,
            description: d.description,
            age: d.age,
            id: d.id
        };
    })
}

export async function addVideosDuMoment({description, age, video}: VideoCreateType): Promise<VideoSelectType | null>{
    const path = crypto.randomUUID(); 

    const {data, error} = await supabase.from(TABLE_VIDEOS_DU_MOMENT).insert({video_url:path, description, age}).select();
    if (error) return null;
     const newVideo = data[0];
    const {error: videoError} = await supabase.storage.from(BUCKET_NAME).upload(path, video);
    if (videoError) {
        await supabase.from(TABLE_VIDEOS_DU_MOMENT).delete().eq('id', newVideo.id);
        return null;
    }
    const { data: { user } } = await supabase.auth.getUser()
    console.log("Résultat upload -> data:", data, "error:", videoError);
    console.log("BUCKET_NAME utilisé :", BUCKET_NAME);
    console.log("path généré :", path); 
    console.log("user = ", user);
    console.log("newVideo: ", newVideo)
    return {
        url: supabase.storage.from(BUCKET_NAME).getPublicUrl(newVideo.video_url).data.publicUrl,
        description: newVideo.description,
        age: newVideo.age,
        id: newVideo.id
    };
}   

export async function deleteVideosDuMoment(id: number) {
    const {data, error} = await supabase.from(TABLE_VIDEOS_DU_MOMENT).select().eq('id', id);
    if (error) return false;
    const {error: videoError} = await supabase.storage.from(BUCKET_NAME).remove(data[0].video_url);
    const {error: dbError} = await supabase.from(TABLE_VIDEOS_DU_MOMENT).delete().eq('id', id);
    if (videoError || dbError) return false;
    return true;
}

export async function deleteArticleDeLaSaison(id: number) {
    const {data, error} = await supabase.from(TABLE_ARTICLE_DE_LA_SAISON).select().eq('id', id);
    if (error) return false;
    const {error: videoError} = await supabase.storage.from(BUCKET_NAME).remove(data[0].video_url);
    const {error: dbError} = await supabase.from(TABLE_ARTICLE_DE_LA_SAISON).delete().eq('id', id);
    if (videoError || dbError) return false;
    return true;
}


export async function replaceArticleDeLaSaison({description, age, video}: VideoCreateType) : Promise<VideoSelectType | null>{
    const { data: { session } } = await supabase.auth.getSession();
    console.log("Session au moment du replace:", session);
    const {data, error} = await supabase.from(TABLE_ARTICLE_DE_LA_SAISON).select();
    if (error) {
        console.log("ReplaceArticleDeLaSaison, erreur: ", error);
        return null;
    }
    if (data.length > 0) {
        const {error: dbError} = await supabase.from(TABLE_ARTICLE_DE_LA_SAISON).delete().eq('id', data[0].id);
        const {error: videoError} = await supabase.storage.from(BUCKET_NAME).remove(data[0].video_url);
        if (videoError || dbError) {
            console.log("ReplaceArticleDeLaSaison, erreur storage: ", videoError);
            console.log("ReplaceArticleDeLaSaison, erreur db: ", dbError);
            return null;
        } 
    }

    const path = crypto.randomUUID(); 
    const {data: dataInsert, error: errorInsert} = await supabase.from(TABLE_ARTICLE_DE_LA_SAISON).insert({video_url:path, description, age}).select();
    if (errorInsert) return null;
     const newVideo = dataInsert[0];
    const {error: videoErrorInsert} = await supabase.storage.from(BUCKET_NAME).upload(path, video);
    if (videoErrorInsert) {
        await supabase.from(TABLE_ARTICLE_DE_LA_SAISON).delete().eq('id', newVideo.id);
        return null;
    }
    return {
        url: supabase.storage.from(BUCKET_NAME).getPublicUrl(newVideo.video_url).data.publicUrl,
        description: newVideo.description,
        age: newVideo.age,
        id: newVideo.id
    };
}
