import { supabase, TABLE_IMAGE } from './SupabaseService';
import { R2_IMAGE_PUBLIC_URL, uploadImage, deleteImage as deleteR2Image } from "./R2Service";
import { TYPE_IMAGE_VALUE, type IMAGE_SELECT_TYPE, type JeuDeSocieteCreate, type JeuDeSocieteSelect, type JouetCreate, type JouetSelect, type MarqueCreate, type MarqueSelect, type PelucheCreate, type PelucheSelect, type TYPE_IMAGE_TYPE } from '../types/ImageType';
import { mapJeuDeSocieteFromSupabase, mapJouetFromSupabase, mapMarqueFromSupabase, mapPelucheFromSupabase } from '../mapper/ImageMapper';
import {mapAge } from '../mapper/UtilsMapper';




export async function addImageMarque(marque: MarqueCreate) : Promise<MarqueSelect | null> {
    const code = crypto.randomUUID(); 
    const url = R2_IMAGE_PUBLIC_URL + "/" + code;
    const {data, error} = await supabase.from(TABLE_IMAGE).insert({url, description: null, age: null, type_age: null, marque:marque.marque, code, type_image : TYPE_IMAGE_VALUE.MARQUE}).select();
    if (error ) return null;
    const newImageMarque = data[0];
    const res = await uploadImage(marque.image, code);
    if(!res.success) {
        console.log("addImageMarque R2 error: ", res.error);
        await supabase.from(TABLE_IMAGE).delete().eq('id', newImageMarque.id);
        return null;
    }
    console.log("Résultat upload -> data:", data, "error:", res.error);
    console.log("code généré :", code); 
    console.log("newImageMarque: ", newImageMarque);
    return {
        url: newImageMarque.url,
        id: newImageMarque.id,
        typeImage : newImageMarque.type_image,
        marque: newImageMarque.marque,
        createdAt: newImageMarque.created_at
    };
}

export async function addImagePeluche(peluche: PelucheCreate) : Promise<PelucheSelect | null> {
    const code = crypto.randomUUID(); 
    const url = R2_IMAGE_PUBLIC_URL + "/" + code;
    const {data, error} = await supabase.from(TABLE_IMAGE).insert({url, description: null, age: null, type_age: null, marque:peluche.marque, code, type_image : TYPE_IMAGE_VALUE.PELUCHE}).select();
    if (error ) return null;
    const newImagePeluche = data[0];
    const res = await uploadImage(peluche.image, code);
    if(!res.success) {
        console.log("addImagePeluche R2 error: ", res.error);
        await supabase.from(TABLE_IMAGE).delete().eq('id', newImagePeluche.id);
        return null;
    }
    console.log("Résultat upload -> data:", data, "error:", res.error);
    console.log("code généré :", code); 
    console.log("newImagePeluche: ", newImagePeluche);
    return {
        url: newImagePeluche.url,
        id: newImagePeluche.id,
        typeImage : newImagePeluche.type_image,
        marque: newImagePeluche.marque,
        createdAt: newImagePeluche.created_at
    };
}

export async function addImageJouet(jouet: JouetCreate) : Promise<JouetSelect | null> {
    const code = crypto.randomUUID(); 
    const url = R2_IMAGE_PUBLIC_URL + "/" + code;
    console.log("AddImageJouet: ", jouet);
    const {data, error} = await supabase.from(TABLE_IMAGE).insert({url, description: jouet.description, age: jouet.age, type_age: jouet.typeAge, marque:null, code, type_image : TYPE_IMAGE_VALUE.JOUET}).select();
    if (error ) return null;
    const newImageJouet = data[0];
    const res = await uploadImage(jouet.image, code);
    if(!res.success) {
        console.log("addImageJouet R2 error: ", res.error);
        await supabase.from(TABLE_IMAGE).delete().eq('id', newImageJouet.id);
        return null;
    }
    console.log("Résultat upload -> data:", data, "error:", res.error);
    console.log("code généré :", code); 
    console.log("newImageJouet: ", newImageJouet);
    return {
        url: newImageJouet.url,
        id: newImageJouet.id,
        typeImage : newImageJouet.type_image,
        age: mapAge(newImageJouet.age, newImageJouet.type_age),
        description: newImageJouet.description,
        createdAt: newImageJouet.created_at
    };
}

export async function addImageJeuDeSociete(jeuDeSociete: JeuDeSocieteCreate) : Promise<JeuDeSocieteSelect | null> {
    const code = crypto.randomUUID(); 
    const url = R2_IMAGE_PUBLIC_URL + "/" + code;
    console.log("AddImageJeuDeSociete: ", jeuDeSociete);
    const {data, error} = await supabase.from(TABLE_IMAGE).insert({url, description: jeuDeSociete.description, age: jeuDeSociete.age, type_age: jeuDeSociete.typeAge, marque:null, code, type_image : TYPE_IMAGE_VALUE.JEU_DE_SOCIETE}).select();
    if (error ) return null;
    const newImageJeuDeSociete = data[0];
    const res = await uploadImage(jeuDeSociete.image, code);
    if(!res.success) {
        console.log("addImagJeuDeSociete R2 error: ", res.error);
        await supabase.from(TABLE_IMAGE).delete().eq('id', newImageJeuDeSociete.id);
        return null;
    }
    console.log("Résultat upload -> data:", data, "error:", res.error);
    console.log("code généré :", code); 
    console.log("newImageJeuDeSociete: ", newImageJeuDeSociete);
    return {
        url: newImageJeuDeSociete.url,
        id: newImageJeuDeSociete.id,
        typeImage : newImageJeuDeSociete.type_image,
        age: mapAge(newImageJeuDeSociete.age, newImageJeuDeSociete.type_age),
        description: newImageJeuDeSociete.description,
        createdAt: newImageJeuDeSociete.created_at
    };
}

export async function getImage(typeImage: "MARQUE"): Promise<MarqueSelect[]>;
export async function getImage(typeImage: "JOUET"): Promise<JouetSelect[]>;
export async function getImage(typeImage: "JEU DE SOCIETE"): Promise<JeuDeSocieteSelect[]>;
export async function getImage(typeImage: "PELUCHE"): Promise<PelucheSelect[]>;
export async function getImage(typeImage: TYPE_IMAGE_TYPE) : Promise<IMAGE_SELECT_TYPE[]>  {
    switch(typeImage) {
        case "MARQUE" : {
            const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "MARQUE");
            if (error) {
                console.log("getImageError : ", error);
                return [];
            } else {
                return data.map(d => mapMarqueFromSupabase(d)) as IMAGE_SELECT_TYPE[];
            }
        }
        case "JOUET" : {
            const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "JOUET");
            if (error) {
                console.log("getImageError : ", error);
                return [];
            } else {
                return data.map(d => mapJouetFromSupabase(d)) as IMAGE_SELECT_TYPE[];
            }
        }
        case "PELUCHE" : {
            const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "PELUCHE");
            if (error) {
                console.log("getImageError : ", error);
                return [];
            } else {
                return data.map(d => mapPelucheFromSupabase(d)) as IMAGE_SELECT_TYPE[];
            }
        }
        case "JEU DE SOCIETE" : {
            const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "JEU DE SOCIETE");
            if (error) {
                console.log("getImageError : ", error);
                return [];
            } else {
                return data.map(d => mapJeuDeSocieteFromSupabase(d)) as IMAGE_SELECT_TYPE[];
            }
        }
        default: 
            console.log("getImageError type inconnu: ", typeImage);
            return [];
        }
}

export async function getImageById(id: number): Promise<IMAGE_SELECT_TYPE | null > {
    const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("id", `${id}`);
    if (error) {
        console.log("getImageByIdError : ", error);
        return null;
    } else {
        return data[0] as IMAGE_SELECT_TYPE;
    }
}

export async function deleteImage(id: number) {
    const {data, error} = await supabase.from(TABLE_IMAGE).select().eq('id', id);
    if (error) return false;
    const res = await deleteR2Image(data[0].code);
    if (!res.success) {
        console.log("deleteVideosDuMoment R2 error: ", res.error);
        return false;
    }
    const {error: dbError} = await supabase.from(TABLE_IMAGE).delete().eq('id', id);
    if (dbError) return false;
    return true;
}