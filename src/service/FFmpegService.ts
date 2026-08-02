import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import {setProgress} from '../hook/useCompressionProgress';

let ffmpeg: FFmpeg | null = null;
let loadingPromise: Promise<FFmpeg> | null = null;

async function getFFmpegInstance(): Promise<FFmpeg> {
    if (ffmpeg) return ffmpeg;

    if(loadingPromise) return loadingPromise;

    loadingPromise = (async () => {
        const instance = new FFmpeg();

        instance.on('progress', ({ progress }) => {
            setProgress(Math.min(Math.max(progress, 0), 1));
        });

        try {
            await instance.load({
                coreURL: await toBlobURL('/ffmpeg/ffmpeg-core.js', 'text/javascript'),
                wasmURL: await toBlobURL('/ffmpeg/ffmpeg-core.wasm', 'application/wasm'),
            });
        } catch (error) {
            loadingPromise = null; // on autorise un nouveau essai plus tard
            throw error;
        }

        ffmpeg = instance; // ← seulement assigné APRÈS succès du chargement
        console.log("FFmpeg chargé avec succès");
        return instance;
    })();

    return loadingPromise;
}

export async function preloadFFmpeg() {
    await getFFmpegInstance();
}

export async function compressVideo(inputFile: File) {
    try {
        const ff = await getFFmpegInstance();


            await ff.writeFile('input.mp4', await fetchFile(inputFile));

            await ff.exec([
                '-i', 'input.mp4',
                '-c:v', 'libx264',
                '-crf', '22',          
                '-preset', 'veryfast',
                '-c:a', 'aac',
                '-b:a', '128k',
                'output.mp4',
            ]);

            const data = await ff.readFile('output.mp4');
            const uint8Data = data as Uint8Array;
            const buffer = new Uint8Array(uint8Data).buffer;
            const blob = new Blob([buffer], { type: 'video/mp4' });

            ff.deleteFile('input.mp4');
            ff.deleteFile('output.mp4');
            
            return new File([blob], inputFile.name.replace(/\.\w+$/, '.mp4'), {
                type: 'video/mp4',
            });
    } catch (error) {
        console.error("Erreur lors de la compression de la vidéo :", error);
        throw error;
    }
   
}