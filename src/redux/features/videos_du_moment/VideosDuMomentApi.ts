import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    getVideosDuMoment,
    deleteVideosDuMoment,
    addVideosDuMoment,
} from '../../../service/VideoService';
import type { VideoSelectType, VideoCreateType } from '../../../types/VideoType';

export const VideosDuMomentApi = createApi({
    reducerPath: 'videosDuMomentApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['VideosDuMoment'],
    endpoints: (builder) => ({
        getVideosDuMoment: builder.query<VideoSelectType[], void>({
            queryFn: async () => {
                const result = await getVideosDuMoment();
                if (result == null) {
                    return { error: { message: 'Erreur lors de la récupération des vidéos' } };
                }
                return { data: result };
            },
            providesTags: ['VideosDuMoment'],
        }),
        deleteVideosDuMoment: builder.mutation<void, number>({
            queryFn: async (id: number) => {
                try {
                    await deleteVideosDuMoment(id);
                    return { data: undefined };
                } catch {
                    return { error: 'Erreur lors de la suppresion' };
                }
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    VideosDuMomentApi.util.updateQueryData(
                        'getVideosDuMoment',
                        undefined,
                        (draft) => draft.filter((v) => v.id !== id),
                    ),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        addVideosDuMoment: builder.mutation<VideoSelectType, VideoCreateType>({
            queryFn: async (newVideo: VideoCreateType) => {
                const result = await addVideosDuMoment(newVideo);
                if (result == null) {
                    return { error: { message: 'Erreur lors de la création de la vidéo' } };
                }
                return { data: result };
            },
            async onQueryStarted(_file, { dispatch, queryFulfilled }) {
                try {
                    const { data: created } = await queryFulfilled;
                    dispatch(
                        VideosDuMomentApi.util.updateQueryData(
                            'getVideosDuMoment',
                            undefined,
                            (draft) => {
                                draft.unshift(created);
                            },
                        ),
                    );
                } catch {}
            },
        }),
    }),
});

export const {
    useGetVideosDuMomentQuery,
    useAddVideosDuMomentMutation,
    useDeleteVideosDuMomentMutation,
} = VideosDuMomentApi;
