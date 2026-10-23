import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AnnonceCreate, AnnonceSelect, AnnonceUpdate } from "../../../types/AnnonceType";
import { createAnnonce, deleteAnnonce, findAllAnnonce, updateAnnonce } from "../../../service/AnnonceService";

export const AnnonceApi = createApi({
    reducerPath: 'Annonce',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Annonces'],
    endpoints: (builder) => ({
        getAnnonce: builder.query<AnnonceSelect[], void>({
            queryFn: async () => {
                try {
                    const result = await findAllAnnonce();
                    return { data: result };
                } catch {
                    return { error : { message : 'Erreur lors de la récupération des annonces'}};
                }
            },
            providesTags: ['Annonces']
        }),
        deleteAnnonce: builder.mutation<void, number>({
            queryFn: async (id: number) => {
                const result = await deleteAnnonce(id);
                if (!result) {
                    return { error: {message: `Erreur lors de la supression de l'annonce ${id}`}};
                }
                return { data: undefined };
            },
            onQueryStarted: async (id: number, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    AnnonceApi.util.updateQueryData(
                        'getAnnonce',
                        undefined,
                        (draft) => draft.filter(v => v.id !== id),
                    ),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            }
        }),
        addAnnonce: builder.mutation<AnnonceSelect, AnnonceCreate>({
            queryFn: async (annonce: AnnonceCreate) => {
                const result = await createAnnonce(annonce);
                if (!result) {
                    return { error: {message: `Erreur lors de la création de l'annonce ${annonce}`}};
                }
                return { data: result };
            },
            onQueryStarted: async (_annonce: AnnonceCreate, { dispatch, queryFulfilled }) => {
                try {
                    const created = await queryFulfilled;
                    dispatch(
                        AnnonceApi.util.updateQueryData(
                            'getAnnonce',
                            undefined,
                            (draft) => { draft.unshift(created.data) },
                        )
                    )
                } catch { }
            }
        }),
        updateAnnonce: builder.mutation<AnnonceSelect,{ oldAnnonce: AnnonceSelect, newAnnonce: AnnonceUpdate }>({
            queryFn: async ({ oldAnnonce, newAnnonce }) => {
                const result = await updateAnnonce(oldAnnonce, newAnnonce);
                if (!result) {
                    return { error: {message: `Erreur lors de la modification de l'annonce ${oldAnnonce} par ${newAnnonce}`}};
                }
                return { data: result };
            },
            onQueryStarted: async (_annonces, {dispatch, queryFulfilled}) => {
                try {
                    const { data: updated } = await queryFulfilled;

                    dispatch(
                        AnnonceApi.util.updateQueryData(
                            'getAnnonce',
                            undefined,
                            (draft) => {
                                const index = draft.findIndex((annonce) => annonce.id === updated.id);
                                if (index !== -1) draft[index] = updated;
                            },
                        ),
                    );
                } catch {}
            }
        })
    })
})

export const {useGetAnnonceQuery, useAddAnnonceMutation, useUpdateAnnonceMutation, useDeleteAnnonceMutation } = AnnonceApi;