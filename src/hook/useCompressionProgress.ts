import { useSyncExternalStore } from 'react';

type ProgressListener = (progress: number) => void;

let currentProgress = 0;
let listeners = new Set<ProgressListener>();

export function setProgress(progress: number) {
    currentProgress = progress;
    listeners.forEach((listener) => listener(progress));
}

export function subscribeProgress(listener: ProgressListener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function getProgress() {
    return currentProgress;
}

export function useCompressionProgress() {
    return useSyncExternalStore(subscribeProgress, getProgress);
}
