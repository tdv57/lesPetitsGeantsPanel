import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { addImage, deleteImage, getImageByType } from '../../../service/ImageService';
import type { ImageCreate, ImageSelect, TYPE_IMAGE_TYPE } from '../../../types/ImageType';
import { TYPE_IMAGE_VALUE } from '../../../types/ImageType';

export const ImageApi = createApi({
    reducerPath: 'imageApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Marques', 'Jouets', 'JeuxDeSociete', 'Peluches', 'Images'],
    endpoints: (builder) => ({
        getImageByType: builder.query<ImageSelect[], TYPE_IMAGE_TYPE>({
            queryFn: async (type: TYPE_IMAGE_TYPE) => {
                const result = await getImageByType(type);
                if (result == null) {
                    return {
                        error: { message: 'Erreur de la recherche des images de type ' + type },
                    };
                }
                return { data: result };
            },
            providesTags: (_result, _error, type) => [mapTypeImageToTag(type)],
        }),

        addImage: builder.mutation<ImageSelect, ImageCreate>({
            queryFn: async (newImage: ImageCreate) => {
                const result = await addImage(newImage);
                if (result == null) {
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

        deleteImage: builder.mutation<void, { id: number; type: TYPE_IMAGE_TYPE }>({
            queryFn: async ({ id, type: _type }: { id: number; type: TYPE_IMAGE_TYPE }) => {
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
                { id, type }: { id: number; type: TYPE_IMAGE_TYPE },
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

function mapTypeImageToTag(
    type: TYPE_IMAGE_TYPE,
): 'Marques' | 'Jouets' | 'JeuxDeSociete' | 'Peluches' {
    switch (type) {
        case TYPE_IMAGE_VALUE.MARQUE:
            return 'Marques';
        case TYPE_IMAGE_VALUE.JOUET:
            return 'Jouets';
        case TYPE_IMAGE_VALUE.JEU_DE_SOCIETE:
            return 'JeuxDeSociete';
        case TYPE_IMAGE_VALUE.PELUCHE:
            return 'Peluches';
    }
}

export const { useGetImageByTypeQuery, useDeleteImageMutation, useAddImageMutation } = ImageApi;
