import { AnnonceClient } from '../cloudflare/AnnonceClient';
import {
    mapAnnonceCreateToD1AnnonceInsert,
    mapAnnonceUpdateToD1AnnonceUpdate,
} from '../mapper/AnnonceMapper';
import type { AnnonceSelect, AnnonceCreate, AnnonceUpdate } from '../types/AnnonceType';
import {
    R2_ANNONCE_PUBLIC_URL,
    uploadAnnonce,
    deleteAnnonce as deleteR2Annonce,
} from './R2Service';

let annonceClient: AnnonceClient | null = null;

export function setAnnonceClient() {
    annonceClient = AnnonceClient.getInstance();
}

export function clearAnnonceClient() {
    if (annonceClient) {
        annonceClient.logout();
    }
}

export async function findAllAnnonce(): Promise<AnnonceSelect[]> {
    if (annonceClient) {
        return await AnnonceClient.getInstance().findAllAnnonce();
    } else {
        console.warn('Client annonce non initialisé');
        return [];
    }
}

export async function createAnnonce(annonce: AnnonceCreate): Promise<AnnonceSelect | null> {
    if (annonceClient) {
        const code = crypto.randomUUID();
        const url = R2_ANNONCE_PUBLIC_URL + '/' + code;
        const newAnnonce = await AnnonceClient.getInstance().createAnnonce(
            mapAnnonceCreateToD1AnnonceInsert(annonce, url, code),
        );
        if (newAnnonce === null) {
            return null;
        }
        const res = await uploadAnnonce(annonce.file, code);
        if (!res.success) {
            console.warn('createAnnonce R2 error: ', res.error);
            await annonceClient.deleteAnnonce(newAnnonce.id);
            return null;
        }
        return newAnnonce;
    } else {
        console.warn('Client annonce non initialisé');
        return null;
    }
}

export async function updateAnnonce(
    oldAnnonce: AnnonceSelect,
    newAnnonce: AnnonceUpdate,
): Promise<AnnonceSelect | null> {
    if (annonceClient) {
        let code = oldAnnonce.code;
        let url = oldAnnonce.url;
        if (newAnnonce.file !== undefined) {
            const res = await deleteR2Annonce(oldAnnonce.code);
            if (!res.success) {
                console.warn('deleteImage R2 error: ', res.error);
                return null;
            }
            code = crypto.randomUUID();
            url = R2_ANNONCE_PUBLIC_URL + '/' + code;
        }
        const updatedAnnonce = await annonceClient.updateAnnonce(
            mapAnnonceUpdateToD1AnnonceUpdate(newAnnonce, url, code),
            oldAnnonce.id,
        );
        if (!updatedAnnonce) {
            console.warn('updateAnnonce D1 error');
            return null;
        }
        if (newAnnonce.file !== undefined) {
            const res = await uploadAnnonce(newAnnonce.file, code);
            if (!res.success) {
                console.warn('UpdateAnnonce R2 error: ', res.error);
                annonceClient.deleteAnnonce(updatedAnnonce.id);
                return null;
            }
        }
        return updatedAnnonce;
    } else {
        console.warn('Client annonce non initialisé');
        return null;
    }
}

export async function deleteAnnonce(id: number): Promise<boolean> {
    if (annonceClient) {
        const annonce = await annonceClient.getAnnonceById(id);
        if (!annonce) {
            return false;
        }
        const res = await deleteR2Annonce(annonce.code);
        if (!res.success) {
            console.warn('deleteAnnonce R2 error: ', res.error);
            return false;
        }
        if (await annonceClient.deleteAnnonce(id)) {
            return true;
        }
        return false;
    } else {
        console.warn('Client annonce non initialisé');
        return false;
    }
}
