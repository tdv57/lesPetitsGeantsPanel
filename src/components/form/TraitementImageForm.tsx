import { useJobsEvents } from '../../hook/useJobsEvents';
import {
    useCreateTraitementMutation,
    useGetTraitementJobsQuery,
} from '../../redux/features/traitement/TraitementApi';
import { useForm } from 'react-hook-form';
import { ImageValidationSchema, type ImageValidationType } from '../validation/ImageValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, VStack } from '@chakra-ui/react';
import { TypeMediaEnumValue } from '../../enum/TypeMediaEnum';
import MediaField from './fields/MediaField';
import { useEffect } from 'react';
import { type JobStatusEnum } from '../../enum/JobStatusEnum';
import type { ImagePayloadType } from '../../types/WorkflowType';
import { skipToken } from '@reduxjs/toolkit/query';

type ImageTraitementFormPropsType = {
    onSuccess: (image: ImagePayloadType | null) => void;
    onError: (error: { message: string; status?: JobStatusEnum; code?: string } | null) => void;
};

export function TraitementImageForm({ onSuccess, onError }: ImageTraitementFormPropsType) {
    const [createTraitement, { data: jobAcceptedData, reset: resetTraitement }] =
        useCreateTraitementMutation();
    const jobId = jobAcceptedData?.job_id ? jobAcceptedData.job_id : null;

    const { isLocked, isRunning, isSending, isDone } = useJobsEvents(jobId);

    const { data: jobOutData, error: jobOutError } = useGetTraitementJobsQuery(
        isDone && jobId ? jobId : skipToken,
    );

    useEffect(() => {
        if (jobOutData) {
            onSuccess(jobOutData);
        }
        if (jobOutError) {
            const message =
                'message' in jobOutError && jobOutError.message
                    ? jobOutError.message
                    : 'Erreur inconnue';
            onError({ message });
        }
    }, [jobOutData, jobOutError, onSuccess, onError]);

    const buttonMessage = isDone
        ? "Relancer le traitement d'image"
        : isSending
          ? "L'image attend d'être traité"
          : isRunning
            ? "L'image est en train d'être traité"
            : "Lancer le traitement de l'image";

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ImageValidationType>({
        resolver: zodResolver(ImageValidationSchema),
    });

    function onSubmit(data: ImageValidationType) {
        createTraitement(data.image);
    }

    function onReset() {
        onSuccess(null);
        onError(null);
        reset();
        resetTraitement();
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
            >
                <VStack gap={4} alignItems="center" w="100%">
                    <MediaField
                        mediaType={TypeMediaEnumValue.IMAGE}
                        error={errors.image}
                        control={control}
                        label={'Image à traiter'}
                        name="image"
                        locked={isLocked}
                    />
                    {isDone ? (
                        <Button
                            type="button"
                            w={{ base: '100%', md: 'auto' }}
                            onClick={() => onReset()}
                        >
                            {buttonMessage}
                        </Button>
                    ) : (
                        <Button type="submit" w={{ base: '100%', md: 'auto' }} disabled={isLocked}>
                            {buttonMessage}
                        </Button>
                    )}
                </VStack>
            </form>
        </>
    );
}
