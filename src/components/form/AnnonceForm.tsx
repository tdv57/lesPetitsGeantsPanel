import { useEffect, useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';
import { ChargementStatutEnumValue, type ChargementStatutEnum } from '../../enum/ChargementStatut';
import { useCompressionProgress } from '../../hook/useCompressionProgress';
import { compressVideo } from '../../service/FFmpegService';
import type { AnnonceCreate, AnnonceSelect, AnnonceUpdate } from '../../types/AnnonceType';
import {
    NewAnnonceFormValidationSchema,
    UpdateAnnonceFormValidationSchema,
    type UpdateAnnonceFormValidationType,
} from '../validation/form/AnnonceFormValidation';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeMediaEnumValue, type TypeMediaEnum } from '../../enum/TypeMediaEnum';
import UrlField from './fields/UrlField';
import TextAreaField from './fields/TextAreaField';
import {
    useAddAnnonceMutation,
    useUpdateAnnonceMutation,
} from '../../redux/features/annonce/AnnonceApi';
import MediaField from './fields/MediaField';

type AnnonceFormPropsType = {
    mediaType: TypeMediaEnum;
    submitMessage: string;
    resetMessage: string;
    annonce?: AnnonceSelect;
    chargementStatut: ChargementStatutEnum;
    setChargementStatut: (newStatut: ChargementStatutEnum) => void;
};

function getDefaultValues(
    mediaType: TypeMediaEnum,
    annonce?: AnnonceSelect,
): UpdateAnnonceFormValidationType {
    if (!annonce) {
        return {
            commentaire: '',
            mediaType: mediaType,
            redirectionLink: '',
            file: undefined,
        } as UpdateAnnonceFormValidationType;
    }

    return {
        id: annonce.id,
        commentaire: annonce.commentaire,
        mediaType: mediaType,
        redirectionLink: annonce?.redirectionLink ?? '',
        file: undefined,
    };
}

export default function AnnonceForm({
    mediaType,
    submitMessage,
    resetMessage,
    annonce,
    chargementStatut,
    setChargementStatut,
}: AnnonceFormPropsType) {
    const [submitMessageState, setSubmitMessageState] = useState(submitMessage);
    const [isLocked, setIsLocked] = useState(true);
    const compressionProgress = useCompressionProgress();
    const [addAnnonce] = useAddAnnonceMutation();
    const [updateAnnonce] = useUpdateAnnonceMutation();

    async function applyAction(
        newAnnonce: AnnonceUpdate,
        oldAnnonce?: AnnonceSelect,
    ): Promise<AnnonceSelect | undefined> {
        try {
            if (oldAnnonce) {
                return await updateAnnonce({
                    oldAnnonce,
                    newAnnonce,
                }).unwrap();
            }
            return await addAnnonce(newAnnonce as AnnonceCreate).unwrap();
        } catch {
            return annonce;
        }
    }

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<UpdateAnnonceFormValidationType>({
        resolver: zodResolver(
            annonce ? UpdateAnnonceFormValidationSchema : NewAnnonceFormValidationSchema,
        ) as Resolver<UpdateAnnonceFormValidationType>,
        defaultValues: getDefaultValues(mediaType, annonce),
    });

    useEffect(() => {
        if (chargementStatut === ChargementStatutEnumValue.Inactif) {
            setSubmitMessageState(submitMessage);
            setIsLocked(false);
        } else if (chargementStatut === ChargementStatutEnumValue.EnAttente) {
            setIsLocked(true);
            if (compressionProgress < 1) {
                setSubmitMessageState(
                    'Compression en cours: ' + (compressionProgress * 100).toFixed(2) + '%',
                );
            } else {
                setSubmitMessageState('Compression terminée, envoi en cours...');
            }
        } else if (chargementStatut === ChargementStatutEnumValue.Terminee) {
            setIsLocked(true);
            setSubmitMessageState('Chargement terminée: ' + resetMessage);
        }
    }, [chargementStatut, compressionProgress, submitMessage, resetMessage]);

    async function onSubmit(data: UpdateAnnonceFormValidationType) {
        if (
            mediaType === TypeMediaEnumValue.VIDEO &&
            (chargementStatut === ChargementStatutEnumValue.EnAttente ||
                chargementStatut === ChargementStatutEnumValue.Terminee)
        )
            return;

        if (mediaType === TypeMediaEnumValue.VIDEO) {
            setChargementStatut(ChargementStatutEnumValue.EnAttente);
        }

        try {
            let file = data.file;
            if (file && data.mediaType === 'VIDEO') {
                file = await compressVideo(file);
            }
            annonce = await applyAction(
                { ...data, redirectionLink: data.redirectionLink || undefined, file },
                annonce,
            );
            setChargementStatut(ChargementStatutEnumValue.Terminee);
        } catch (e) {
            console.error('Erreur pendant la création :', e);
            setChargementStatut(ChargementStatutEnumValue.Inactif);
        }
    }

    function onReset(
        resetMediaType: TypeMediaEnum,
        resetAnnonce?: AnnonceSelect,
    ): UpdateAnnonceFormValidationType {
        setChargementStatut(ChargementStatutEnumValue.Inactif);
        return getDefaultValues(resetMediaType, resetAnnonce);
    }

    function getSubmitButton() {
        if (chargementStatut === ChargementStatutEnumValue.Inactif) {
            return (
                <>
                    <Button type="submit">{submitMessageState}</Button>
                    <Button onClick={() => reset(onReset(mediaType, annonce))}>
                        Réinitialiser les données
                    </Button>
                </>
            );
        } else if (chargementStatut === ChargementStatutEnumValue.EnAttente) {
            return <Button disabled={true}>{submitMessageState}</Button>;
        } else {
            return (
                <Button onClick={() => reset(onReset(mediaType, annonce))}>
                    {submitMessageState}
                </Button>
            );
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4} alignItems="center" justifyItems="center">
                    <TextAreaField
                        error={errors.commentaire}
                        register={register('commentaire')}
                        label={'Commentaire du média'}
                        locked={isLocked}
                    />
                    <UrlField
                        error={errors.redirectionLink}
                        register={register('redirectionLink')}
                        fieldLabel={'Lien de redirection si on clique sur le média'}
                        placeholder={' '}
                        locked={isLocked}
                    />
                    <MediaField
                        mediaType={mediaType}
                        error={errors.file}
                        label={`Ajouter une ${mediaType === TypeMediaEnumValue.IMAGE ? 'image' : 'vidéo'}`}
                        name="file"
                        control={control}
                        locked={isLocked}
                    />
                    {getSubmitButton()}
                </VStack>
            </form>
        </>
    );
}
