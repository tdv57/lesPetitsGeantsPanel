import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { addImage, deleteImage, getImageByType, updateImage } from '../../../service/ImageService';
import type { ImageUpdate, ImageCreate, ImageSelect } from '../../../types/ImageType';
import { TypeImageEnumValue, type TypeImageEnum } from '../../../enum/TypeImageEnum';

export const ImageApi = createApi({
    reducerPath: 'imageApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: Object.values(TypeImageEnumValue),
    endpoints: (builder) => ({
        getImageByType: builder.query<ImageSelect[], TypeImageEnum>({
            queryFn: async (type: TypeImageEnum) => {
                const result = await getImageByType(type);
                if (result === null) {
                    return {
                        error: { message: 'Erreur de la recherche des images de type ' + type },
                    };
                }
                return { data: result };
            },
            providesTags: (_result, _error, type) => [type],
        }),

        addImage: builder.mutation<ImageSelect, ImageCreate>({
            queryFn: async (newImage: ImageCreate) => {
                const result = await addImage(newImage);
                if (result === null) {
                    return { error: { message: "Erreur lors de la création d'une image " } };
                }
                return { data: result };
            },
            async onQueryStarted(newImage, { dispatch, queryFulfilled }) {
                try {
                    const { data: created } = await queryFulfilled;

                    dispatch(
                        ImageApi.util.updateQueryData(
                            'getImageByType',
                            newImage.typeImage,
                            (draft) => {
                                draft.unshift(created);
                            },
                        ),
                    );
                } catch {}
            },
        }),

        updateImage: builder.mutation<
            ImageSelect,
            { oldImage: ImageSelect; newImage: ImageUpdate }
        >({
            queryFn: async ({
                oldImage,
                newImage,
            }: {
                oldImage: ImageSelect;
                newImage: ImageUpdate;
            }) => {
                const result = await updateImage(oldImage, newImage);
                if (result === null) {
                    return { error: { message: "Erreur lors de la modification d'une image " } };
                }
                return { data: result };
            },
            async onQueryStarted({ oldImage, newImage: _newImage }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updated } = await queryFulfilled;

                    dispatch(
                        ImageApi.util.updateQueryData(
                            'getImageByType',
                            oldImage.typeImage,
                            (draft) => {
                                const index = draft.findIndex((image) => image.id === updated.id);
                                if (index !== -1) draft[index] = updated;
                            },
                        ),
                    );
                } catch {}
            },
        }),

        deleteImage: builder.mutation<void, { id: number; type: TypeImageEnum }>({
            queryFn: async ({ id, type: _type }: { id: number; type: TypeImageEnum }) => {
                if (!(await deleteImage(id))) {
                    return {
                        error: {
                            message: "Erreur lors de la suppression de l'image avec l'id " + id,
                        },
                    };
                }
                return { data: undefined };
            },
            async onQueryStarted(
                { id, type }: { id: number; type: TypeImageEnum },
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    ImageApi.util.updateQueryData('getImageByType', type, (draft) => {
                        const index = draft.findIndex((d) => d.id === id);
                        if (index !== -1) draft.splice(index, 1);
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetImageByTypeQuery,
    useDeleteImageMutation,
    useAddImageMutation,
    useUpdateImageMutation,
} = ImageApi;
