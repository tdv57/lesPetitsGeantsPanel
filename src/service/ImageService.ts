import { supabase, TABLE_IMAGE } from './SupabaseService';
import { R2_IMAGE_PUBLIC_URL, uploadImage, deleteImage as deleteR2Image } from './R2Service';
import type { ImageCreate, ImageSelect, ImageUpdate } from '../types/ImageType';
import {
    mapImageCreateToRawImageCreate,
    mapImageUpdateToRawImageCreate,
    mapRawImageSelectToImageSelect,
} from '../mapper/ImageMapper';
import type { TypeImageEnum } from '../enum/TypeImageEnum';

export async function addImage(image: ImageCreate): Promise<ImageSelect | null> {
    const code = crypto.randomUUID();
    const url = R2_IMAGE_PUBLIC_URL + '/' + code;
    const { data, error } = await supabase
        .from(TABLE_IMAGE)
        .insert(mapImageCreateToRawImageCreate(image, url, code))
        .select();
    if (error) return null;
    const newImage = data[0];
    const res = await uploadImage(image.image, code);
    if (!res.success) {
        console.warn('addImage R2 error: ', res.error);
        await supabase.from(TABLE_IMAGE).delete().eq('id', newImage.id);
        return null;
    }
    return mapRawImageSelectToImageSelect(newImage);
}

export async function getImageByType(typeImage: TypeImageEnum): Promise<ImageSelect[]> {
    const { data, error } = await supabase.from(TABLE_IMAGE).select().eq('type_image', typeImage);
    if (error) {
        console.warn('getImageError : ', error);
        return [];
    } else {
        return data.map((d) => mapRawImageSelectToImageSelect(d)) as ImageSelect[];
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

export async function updateImage(
    oldImage: ImageSelect,
    newImage: ImageUpdate,
): Promise<ImageSelect | null> {
    let code = oldImage.code;
    let url = oldImage.url;
    if (newImage.image !== undefined) {
        const res = await deleteR2Image(oldImage.code);
        if (!res.success) {
            console.warn('deleteImage R2 error: ', res.error);
            return null;
        }
        code = crypto.randomUUID();
        url = R2_IMAGE_PUBLIC_URL + '/' + code;
    }

    const { data, error } = await supabase
        .from(TABLE_IMAGE)
        .update(mapImageUpdateToRawImageCreate(newImage, url, code))
        .eq('id', oldImage.id)
        .select()
        .single();

    if (error) {
        console.warn('Supabase error : ' + error);
        return null;
    }
    const updatedImage = data;
    if (newImage.image !== undefined) {
        const res = await uploadImage(newImage.image, code);
        if (!res.success) {
            console.warn('UpdateImage R2 error: ', res.error);
            await supabase.from(TABLE_IMAGE).delete().eq('id', newImage.id);
            return null;
        }
    }

    return mapRawImageSelectToImageSelect(updatedImage);
}
