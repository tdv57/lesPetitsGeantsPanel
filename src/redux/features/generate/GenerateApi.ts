import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { generate, getGenerateJob} from '../../../service/WorkflowService';
import { JobStatusEnumValue, type JobStatusEnum } from '../../../enum/JobStatusEnum';
import type { GenerateOutType, JobAcceptedType } from '../../../types/WorkflowType';
import type { TypeImageEnum } from '../../../enum/TypeImageEnum';

export const GenerateApi = createApi({
    reducerPath: 'generate',
    baseQuery: fakeBaseQuery<{ message: string; status?: JobStatusEnum; code?: string }>(),
    tagTypes: ['generate'],
    endpoints: (builder) => ({
        getGenerateJob: builder.query<GenerateOutType, string>({
            queryFn: async (jobId: string) => {
                const result = await getGenerateJob(jobId);
                if (result === null) {
                    return {
                        error: {
                            message: `Erreur de la recherche du job ${jobId} lors de la génération de données`,
                        },
                    };
                }
                if (result.status === JobStatusEnumValue.FAILED) {
                    return {
                        error: {
                            status: result.status,
                            code: result.error_code ?? '',
                            message: result.error_message ?? '',
                        },
                    };
                }
                if (result.status !== JobStatusEnumValue.COMPLETE) {
                    return {
                        error: { status: result.status, message: "La génération de donnée n'est pas fini" },
                    };
                }
                if (result.result === null) {
                    return {
                        error: { message: 'La génération de données a fini sans renvoyer de résultat' },
                    };
                }
                return { data: result.result };
            },
            providesTags: (_result, _error, jobId) => [{ type: 'generate', id: jobId }],
        }),
        createGenerate: builder.mutation<JobAcceptedType, {prompt: string, schema: object, typeImage: TypeImageEnum, image?: File}>({
            queryFn: async (params: {prompt: string, schema: object, typeImage: TypeImageEnum, image?: File}) => {
                const result = await generate(params);
                if (result === null) {
                    return {
                        error: { message: `Erreur du traitement d'image` },
                    };
                }
                return { data: result };
            },
        }),
    }),
});

export const { useGetGenerateJobQuery, useCreateGenerateMutation } = GenerateApi;
