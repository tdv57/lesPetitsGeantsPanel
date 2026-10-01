import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { supabase } from './SupabaseService.ts';

let r2: S3Client | null = null;
export const R2_IMAGE_PUBLIC_URL = 'https://pub-5f1a24a80f174f9d918f6aaef649443d.r2.dev';
export const R2_VIDEO_PUBLIC_URL = 'https://pub-f7df7364451c4bdbb896bec94fed2057.r2.dev';
export const R2_IMAGE_BUCKET_NAME = 'les-petits-geants-image';
export const R2_VIDEO_BUCKET_NAME = 'les-petits-geants-video';

export async function setR2Client() {
    if (!r2) {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const r2Creds = user?.app_metadata;
        if (r2Creds) {
            r2 = new S3Client({
                region: 'auto',
                endpoint: `https://${r2Creds.r2_account_id}.r2.cloudflarestorage.com`,
                credentials: {
                    accessKeyId: r2Creds.r2_access_key_id,
                    secretAccessKey: r2Creds.r2_secret_access_key,
                },
                requestChecksumCalculation: 'WHEN_REQUIRED',
            });
            return;
        }
        return;
    } else {
        return;
    }
}

export function clearR2Client() {
    r2 = null;
}

export async function uploadImage(file: File, code: string) {
    if (r2) {
        try {
            await r2.send(
                new PutObjectCommand({
                    Bucket: R2_IMAGE_BUCKET_NAME,
                    Key: code,
                    Body: file,
                    ContentType: file.type,
                }),
            );
            return { success: true };
        } catch (error) {
            console.error('Error uploading image to R2:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erreur inconnue',
            };
        }
    } else {
        return { success: false, error: 'Client R2 non initialisé' };
    }
}

export async function deleteImage(key: string) {
    if (r2) {
        try {
            await r2.send(new DeleteObjectCommand({ Bucket: R2_IMAGE_BUCKET_NAME, Key: key }));
            return { success: true };
        } catch (error) {
            console.error('Error deleting image from R2:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erreur inconnue',
            };
        }
    } else {
        return { success: false, error: 'Client R2 non initialisé' };
    }
}

export async function uploadVideo(file: File, code: string) {
    if (r2) {
        try {
            await r2.send(
                new PutObjectCommand({
                    Bucket: R2_VIDEO_BUCKET_NAME,
                    Key: code,
                    Body: file,
                    ContentType: file.type,
                }),
            );
            return { success: true };
        } catch (error) {
            console.error('Error uploading video to R2:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erreur inconnue',
            };
        }
    } else {
        return { success: false, error: 'Client R2 non initialisé' };
    }
}

export async function deleteVideo(key: string) {
    if (r2) {
        try {
            await r2.send(new DeleteObjectCommand({ Bucket: R2_VIDEO_BUCKET_NAME, Key: key }));
            return { success: true };
        } catch (error) {
            console.error('Error deleting video from R2:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erreur inconnue',
            };
        }
    } else {
        return { success: false, error: 'Client R2 non initialisé' };
    }
}
