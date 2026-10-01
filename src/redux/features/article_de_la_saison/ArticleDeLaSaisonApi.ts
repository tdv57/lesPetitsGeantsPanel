import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    deleteArticleDeLaSaison,
    getArticleDeLaSaison,
    replaceArticleDeLaSaison,
} from '../../../service/VideoService';
import type { VideoCreateType, VideoSelectType } from '../../../types/VideoType';

export const ArticleDeLaSaisonApi = createApi({
    reducerPath: 'ArticleDeLaSaison',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['ArticleDeLaSaison'],
    endpoints: (builder) => ({
        getArticleDeLaSaison: builder.query<VideoSelectType | null, void>({
            queryFn: async () => {
                const result = await getArticleDeLaSaison();
                if (result === null) {
                    return {
                        error: {
                            message: "Erreur lors de la récupération de l'article de la saison",
                        },
                    };
                }
                return { data: result };
            },
            providesTags: ['ArticleDeLaSaison'],
        }),

        replaceArticleDeLaSaison: builder.mutation<VideoSelectType, VideoCreateType>({
            queryFn: async (newVideo: VideoCreateType) => {
                const result = await replaceArticleDeLaSaison(newVideo);
                if (result === null) {
                    return {
                        error: { message: "Erreur lors du remplacement de l'article de la saison" },
                    };
                }
                return { data: result };
            },
            async onQueryStarted(_newVideo, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    ArticleDeLaSaisonApi.util.updateQueryData(
                        'getArticleDeLaSaison',
                        undefined,
                        () => null,
                    ),
                );

                try {
                    const { data: video } = await queryFulfilled;
                    dispatch(
                        ArticleDeLaSaisonApi.util.updateQueryData(
                            'getArticleDeLaSaison',
                            undefined,
                            () => video,
                        ),
                    );
                } catch {
                    patchResult.undo();
                }
            },
        }),

        deleteArticleDeLaSaison: builder.mutation<void, void>({
            queryFn: async () => {
                if (!(await deleteArticleDeLaSaison())) {
                    return {
                        error: {
                            message: "Erreur lors de la suppression de l'article de la saison",
                        },
                    };
                }
                return { data: undefined };
            },
            async onQueryStarted(_a, { dispatch, queryFulfilled: _queryFulfilled }) {
                const resultDispatch = dispatch(
                    ArticleDeLaSaisonApi.util.updateQueryData(
                        'getArticleDeLaSaison',
                        undefined,
                        () => null,
                    ),
                );

                try {
                    await deleteArticleDeLaSaison();
                } catch {
                    resultDispatch.undo();
                }
            },
        }),
    }),
});

export const {
    useGetArticleDeLaSaisonQuery,
    useReplaceArticleDeLaSaisonMutation,
    useDeleteArticleDeLaSaisonMutation,
} = ArticleDeLaSaisonApi;
