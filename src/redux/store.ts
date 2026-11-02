import { configureStore } from '@reduxjs/toolkit';
import { VideosDuMomentApi } from './features/videos_du_moment/VideosDuMomentApi';
import { ImageApi } from './features/images/ImageApi';
import { ArticleDeLaSaisonApi } from './features/article_de_la_saison/ArticleDeLaSaisonApi';
import { AnnonceApi } from './features/annonce/AnnonceApi';
import { jobsReducer } from './slice/JobsSlice';
import { TraitementApi } from './features/traitement/TraitementApi';

export const store = configureStore({
    reducer: {
        [VideosDuMomentApi.reducerPath]: VideosDuMomentApi.reducer,
        [ImageApi.reducerPath]: ImageApi.reducer,
        [ArticleDeLaSaisonApi.reducerPath]: ArticleDeLaSaisonApi.reducer,
        [AnnonceApi.reducerPath]: AnnonceApi.reducer,
        [TraitementApi.reducerPath]: TraitementApi.reducer,
        jobs: jobsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ['meta.arg', 'meta.baseQueryMeta', /\.createdAt$/],
                ignoredPaths: [/\.createdAt$/],
            },
        })
            .concat(VideosDuMomentApi.middleware)
            .concat(ImageApi.middleware)
            .concat(ArticleDeLaSaisonApi.middleware)
            .concat(AnnonceApi.middleware)
            .concat(TraitementApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;