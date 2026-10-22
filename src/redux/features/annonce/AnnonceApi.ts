import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query";

export const AnnonceApi = createApi({
    reducerPath: 'Annonce',
    baseQuery: fakeBaseQuery(),
    tagTypes = ["Annonces"],
    endpoints: (builder) => ({
        
    })
})