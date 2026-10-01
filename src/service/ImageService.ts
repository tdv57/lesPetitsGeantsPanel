import { supabase, TABLE_IMAGE } from './SupabaseService';
import { R2_IMAGE_PUBLIC_URL, uploadImage, deleteImage as deleteR2Image } from './R2Service';
import type { ImageCreate, ImageSelect, TYPE_IMAGE_TYPE } from '../types/ImageType';
import {
    mapJeuDeSocieteFromSupabase,
    mapJouetFromSupabase,
    mapMarqueFromSupabase,
    mapPelucheFromSupabase,
} from '../mapper/ImageMapper';
import { mapAge } from '../mapper/UtilsMapper';

export async function addImage(image: ImageCreate): Promise<ImageSelect | null> {
    const code = crypto.randomUUID();
    const url = R2_IMAGE_PUBLIC_URL + '/' + code;
    const { data, error } = await supabase
        .from(TABLE_IMAGE)
        .insert({
            url,
            description: image.description,
            age: image.age,
            type_age: image.typeAge,
            marque: image.marque,
            code,
            type_image: image.typeImage,
        })
        .select();
    if (error) return null;
    const newImage = data[0];
    const res = await uploadImage(image.image, code);
    if (!res.success) {
        console.warn('addImage R2 error: ', res.error);
        await supabase.from(TABLE_IMAGE).delete().eq('id', newImage.id);
        return null;
    }
    return {
        url: newImage.url,
        id: newImage.id,
        typeImage: newImage.type_image,
        marque: newImage.marque,
        age: mapAge(newImage.age, newImage.type_age),
        description: newImage.description,
        createdAt: newImage.created_at,
    };
}

export async function getImageByType(typeImage: TYPE_IMAGE_TYPE): Promise<ImageSelect[]> {
    switch (typeImage) {
        case 'MARQUE': {
            const { data, error } = await supabase
                .from(TABLE_IMAGE)
                .select()
                .eq('type_image', 'MARQUE');
            if (error) {
                console.warn('getImageError : ', error);
                return [];
            } else {
                return data.map((d) => mapMarqueFromSupabase(d)) as ImageSelect[];
            }
        }
        case 'JOUET': {
            const { data, error } = await supabase
                .from(TABLE_IMAGE)
                .select()
                .eq('type_image', 'JOUET');
            if (error) {
                console.warn('getImageError : ', error);
                return [];
            } else {
                return data.map((d) => mapJouetFromSupabase(d)) as ImageSelect[];
            }
        }
        case 'PELUCHE': {
            const { data, error } = await supabase
                .from(TABLE_IMAGE)
                .select()
                .eq('type_image', 'PELUCHE');
            if (error) {
                console.warn('getImageError : ', error);
                return [];
            } else {
                return data.map((d) => mapPelucheFromSupabase(d)) as ImageSelect[];
            }
        }
        case 'JEU DE SOCIETE': {
            const { data, error } = await supabase
                .from(TABLE_IMAGE)
                .select()
                .eq('type_image', 'JEU DE SOCIETE');
            if (error) {
                console.warn('getImageError : ', error);
                return [];
            } else {
                return data.map((d) => mapJeuDeSocieteFromSupabase(d)) as ImageSelect[];
            }
        }
        default:
            console.warn('getImageError type inconnu: ', typeImage);
            return [];
    }
}

export async function getImageById(id: number): Promise<ImageSelect | null> {
    const { data, error } = await supabase.from(TABLE_IMAGE).select().eq('id', `${id}`);
    if (error) {
        console.warn('getImageByIdError : ', error);
        return null;
    } else {
        return data[0] as ImageSelect;
    }
}

export async function deleteImage(id: number) {
    const { data, error } = await supabase.from(TABLE_IMAGE).select().eq('id', id);
    if (error) return false;
    const res = await deleteR2Image(data[0].code);
    if (!res.success) {
        console.warn('deleteImage R2 error: ', res.error);
        return false;
    }
    const { error: dbError } = await supabase.from(TABLE_IMAGE).delete().eq('id', id);
    if (dbError) return false;
    return true;
}
