import { configureStore } from '@reduxjs/toolkit';
import { VideosDuMomentApi } from './features/videos_du_moment/VideosDuMomentApi';
import { ImageApi } from './features/images/ImageApi';
import { ArticleDeLaSaisonApi } from './features/article_de_la_saison/ArticleDeLaSaisonApi';
export const store = configureStore({
    reducer: {
        [VideosDuMomentApi.reducerPath]: VideosDuMomentApi.reducer,
        [ImageApi.reducerPath]: ImageApi.reducer,
        [ArticleDeLaSaisonApi.reducerPath]: ArticleDeLaSaisonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(VideosDuMomentApi.middleware)
            .concat(ImageApi.middleware)
            .concat(ArticleDeLaSaisonApi.middleware),
});
