import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTraitementJob, traitement } from "../../../service/WorkflowService";
import { JobStatusEnumValue, type JobStatusEnum } from "../../../enum/JobStatusEnum";
import type { ImagePayloadType, JobAcceptedType } from "../../../types/WorkflowType";

export const TraitementApi = createApi({
    reducerPath: 'traitement',
    baseQuery: fakeBaseQuery<{ message: string, status?: JobStatusEnum, code?: string }>(),
    tagTypes: ['traitement'],
    endpoints: (builder) => ({
        getTraitementJobs: builder.query<ImagePayloadType, string>({
            queryFn: async (jobId: string) => {
                const result = await getTraitementJob(jobId);
                if (result === null) {
                    return {
                        error: { message: `Erreur de la recherche du job ${jobId} lors du traitement d'image` },
                    };
                }
                if (result.status === JobStatusEnumValue.FAILED) {
                    return {
                        error : { status: result.status, code: result.error_code ?? "", message: result.error_message ?? "" }
                    }
                }
                if (result.status !== JobStatusEnumValue.COMPLETE) {
                    return {
                        error : { status: result.status, message: "Le traitement n'est pas fini" }
                    }
                }
                if (result.result === null) {
                    return {
                        error : { message: "Le traitement a fini sans renvoyé de résultat" }
                    }
                }
                return { data: result.result }
            },
            providesTags: (_result, _error, jobId) => [{ type: "traitement", id: jobId }]
        }),
        createTraitement: builder.mutation<JobAcceptedType, File>({
            queryFn: async (image: File) => {
                const result = await traitement(image);
                if (result === null) {
                    return {
                        error: { message: `Erreur du traitement d'image` },
                    };
                }
                return { data: result }
            }
        })
    })
});

export const {
    useGetTraitementJobsQuery,
    useCreateTraitementMutation
} = TraitementApi;