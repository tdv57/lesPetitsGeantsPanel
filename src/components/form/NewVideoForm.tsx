import { useEffect, useRef, useState } from 'react';
import type { VideoCreateType, VideoSelectType } from '../../types/VideoType';
import { Button, Field, Input, Stack, Textarea, Text, NumberInput, Select } from '@chakra-ui/react';
import type { FormPropsType } from '../modal/BoutonCreationVideo';
import { ChargementStatut } from '../../enum/ChargementStatut';
import { newVideoFormValidationSchema } from '../validation/NewVideoFormValidation';
import { useCompressionProgress } from '../../hook/useCompressionProgress';
import { compressVideo } from '../../service/FFmpegService';
import { typeAgeCollection } from '../../mapper/AgeMapper';

type NewVideoFormPropType = {
    supabaseAction: (video: VideoCreateType) => Promise<VideoSelectType | null>;
    submitMessage: string;
    resetMessage: string;
    onReset: () => void;
    formProps: FormPropsType;
};

export default function NewVideoForm({
    supabaseAction,
    submitMessage,
    resetMessage,
    onReset,
    formProps,
}: NewVideoFormPropType) {
    const [submitMessageState, setSubmitMessageState] = useState(submitMessage);
    const [isLocked, setIsLocked] = useState(true);
    const [error, setError] = useState<Record<string, string>>({});
    const compressionProgress = useCompressionProgress();
    const {
        description,
        setDescription,
        age,
        setAge,
        typeAge,
        setTypeAge,
        video,
        setVideo,
        chargementStatut,
        setChargementStatut,
    } = formProps;
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleVideo(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        if (e.target.files) {
            setVideo(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (chargementStatut === ChargementStatut.Inactif) {
            setSubmitMessageState(submitMessage);
            setIsLocked(false);
        } else if (chargementStatut === ChargementStatut.EnAttente) {
            setIsLocked(true);
            if (compressionProgress < 1) {
                setSubmitMessageState(
                    'Compression en cours: ' + (compressionProgress * 100).toFixed(2) + '%',
                );
            } else {
                setSubmitMessageState('Compression terminée, envoi en cours...');
            }
        } else if (chargementStatut === ChargementStatut.Terminee) {
            setIsLocked(true);
            setSubmitMessageState('Chargement terminée: ' + resetMessage);
        }
    }, [chargementStatut, compressionProgress, submitMessage, resetMessage]);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            chargementStatut === ChargementStatut.EnAttente ||
            chargementStatut === ChargementStatut.Terminee
        )
            return;

        const result = newVideoFormValidationSchema.safeParse({
            description,
            age,
            typeAge,
            video,
        });

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((e) => {
                const key = e.path[0] as string;
                fieldErrors[key] = e.message;
            });
            setError(fieldErrors);
            return;
        }

        setError({});

        const videoDescription = result.data.description;
        const videoAge = result.data.age === '' ? null : Number(result.data.age);
        const videoTypeAge: 'ANS' | 'MOIS' | null =
            result.data.typeAge === '' ? null : (result.data.typeAge as 'ANS' | 'MOIS');
        let videoBlob = result.data.video;
        setChargementStatut(ChargementStatut.EnAttente);
        try {
            videoBlob = await compressVideo(videoBlob);
            await supabaseAction({
                description: videoDescription,
                age: videoAge,
                typeAge: videoTypeAge,
                video: videoBlob,
            });
            setChargementStatut(ChargementStatut.Terminee);
        } catch (e) {
            console.error('Erreur pendant la création :', e);
        }
    }

    function getSubmitButton() {
        if (chargementStatut === ChargementStatut.Inactif) {
            return (
                <>
                    <Button type="submit">{submitMessageState}</Button>
                    <Button onClick={() => onReset()}>Réinitialiser les données</Button>
                </>
            );
        } else if (chargementStatut === ChargementStatut.EnAttente) {
            return <Button disabled={true}>{submitMessageState}</Button>;
        } else {
            return <Button onClick={() => onReset()}>{submitMessageState}</Button>;
        }
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Stack gap={4}>
                    <Field.Root invalid={!!error.description}>
                        <Field.Label color="black">description</Field.Label>
                        <Textarea
                            id="description"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            disabled={isLocked}
                            color="black"
                        />
                        <Field.ErrorText>{error.description}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!error.age}>
                        <Field.Label color="black">age</Field.Label>
                        <NumberInput.Root
                            onValueChange={(e) => setAge(e.value)}
                            value={age}
                            disabled={isLocked}
                            min={1}
                            color="black"
                        >
                            <NumberInput.Control />
                            <NumberInput.Input id="age" name="age" />
                        </NumberInput.Root>
                        <Field.ErrorText>{error.age}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!error.typeAge}>
                        <Field.Label color="black">type d'âge</Field.Label>
                        <Select.Root
                            collection={typeAgeCollection}
                            value={typeAge ? [typeAge] : []}
                            onValueChange={(e) =>
                                setTypeAge((e.value[0] as '' | 'ANS' | 'MOIS') ?? '')
                            }
                            disabled={isLocked}
                            color="black"
                        >
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="--" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>

                            <Select.Positioner>
                                <Select.Content>
                                    {typeAgeCollection.items.map((item) => (
                                        <Select.Item key={item.value} item={item}>
                                            {item.label}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Select.Root>
                        <Field.ErrorText>{error.typeAge}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!error.video}>
                        <Input
                            type="file"
                            ref={fileInputRef}
                            id="video"
                            accept="video/mp4,video/*"
                            onChange={handleVideo}
                            value=""
                            disabled={isLocked}
                            color="black"
                            style={{ display: 'none' }}
                        />

                        <Button onClick={() => fileInputRef.current?.click()} disabled={isLocked}>
                            Choisir une vidéo
                        </Button>

                        <Text fontSize="sm" color="gray.600" mt={1}>
                            {video
                                ? `Fichier sélectionné : ${video.name} (${(video.size / 1_000_000).toFixed(1)} Mo)`
                                : `Aucun fichier sélectionné`}
                        </Text>
                        <Field.ErrorText>{error.video}</Field.ErrorText>
                    </Field.Root>

                    {getSubmitButton()}
                </Stack>
            </form>
        </>
    );
}
