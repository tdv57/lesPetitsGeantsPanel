import { useEffect, useEffectEvent, useState } from 'react';
import { useJobsEvents } from './useJobsEvents';
import {
    useCreateGenerateMutation,
    useGetGenerateJobQuery,
} from '../redux/features/generate/GenerateApi';
import { skipToken } from '@reduxjs/toolkit/query';
import type { ZodObject } from 'zod';
import { buildGenerate } from '../service/WorkflowService';
import type { TypeImageEnum } from '../enum/TypeImageEnum';
import { mapImagePayloadToFile } from '../mapper/ImageMapper';
import type { JobGenerateOutType } from '../types/WorkflowType';

type useGenerateFormPropsType = {
    keyJobId: string | null;
    getValues: () => Record<string, unknown>;
    ignored: string[];
    validationSchemaForSafeParse: ZodObject;
    shape: ZodObject;
    basePrompt: string;
    typeImage: TypeImageEnum;
    onResult: (fields: Record<string, unknown>, image: File) => void;
};

const toFillRefMap: Map<string, { current: string[] }> = new Map();

export function useGenerateForm({
    keyJobId,
    shape,
    validationSchemaForSafeParse,
    onResult,
    getValues,
    ignored,
    basePrompt,
    typeImage,
}: useGenerateFormPropsType) {
    const [createGenerate, { data: jobAcceptedData, reset: resetGenerate }] =
        useCreateGenerateMutation({ fixedCacheKey: keyJobId ? keyJobId : undefined });
    const jobId = jobAcceptedData ? jobAcceptedData.job_id : null;
    const { isLocked, isDone } = useJobsEvents(jobId);
    const [validationError, setValidationError] = useState<string | null>(null);

    const toFillRef = (keyJobId && toFillRefMap.get(keyJobId)) || { current: [] as string[] };
    if (keyJobId) toFillRefMap.set(keyJobId, toFillRef);

    const { data: jobOutData, error: jobOutError } = useGetGenerateJobQuery(
        isDone && jobId ? jobId : skipToken,
    );

    const queryErrorMessage = jobOutError
        ? 'message' in jobOutError && jobOutError.message
            ? jobOutError.message
            : 'Erreur inconnue'
        : null;

    const jobErrorMessage = queryErrorMessage ?? validationError;

    const applyResult = useEffectEvent((data: JobGenerateOutType['result']) => {
        if (!data) return;
        const parsed = shape.partial().safeParse(data.fields);
        if (!parsed.success) {
            setValidationError("Les valeurs renvoyées par l'IA sont incorrectes");
            return;
        }
        const requested = Object.fromEntries(
            Object.entries(parsed.data).filter(([k]) => toFillRef.current.includes(k)),
        );
        onResult(requested, mapImagePayloadToFile(data.image, 'generated'));
    });

    useEffect(() => {
        if (jobOutData) applyResult(jobOutData);
    }, [jobOutData]);

    function onGenerateSubmit(prompt: string) {
        const values = getValues();
        const generatePreparation = buildGenerate(
            values,
            ignored,
            validationSchemaForSafeParse,
            shape,
            basePrompt,
        );
        if (!generatePreparation.image && generatePreparation.toFill.length === 0) {
            return;
        }
        setValidationError(null);
        resetGenerate();
        toFillRef.current = generatePreparation.toFill;
        createGenerate({
            prompt: prompt + generatePreparation.prompt,
            schema: generatePreparation.schema,
            typeImage,
            image: generatePreparation.image,
        });
    }

    return { jobOutData, jobErrorMessage, isLocked, onGenerateSubmit, resetGenerate };
}
