import { useState } from "react";
import { TraitementImageForm } from "../form/TraitementImageForm";
import type { ImagePayloadType } from "../../types/WorkflowType";
import type { JobStatusEnum } from "../../enum/JobStatusEnum";
import { Box, Button, VStack, Text, Image } from "@chakra-ui/react";
import { LuDownload } from "react-icons/lu";
import { ErrorMessage } from "../error/ErrorMessage";
import { COLORS } from "../../theme/Couleur";

export function TraitementImage() {
    const [ imagePayloadData, setImagePayloadData ] = useState<ImagePayloadType | null>(null);
    const [ imagePayloadError, setImagePayloadError ] = useState<({ message: string; status?: JobStatusEnum; code?: string }) | null>(null);

    const onSuccess = (image: ImagePayloadType | null) => setImagePayloadData(image);
    const onError = (error: { message: string; status?: JobStatusEnum; code?: string } | null) => setImagePayloadError(error);

    const extFromMime = (mime: string) => mime.split("/")[1]?.split("+")[0] ?? "png";

    return (<>
    <VStack gap={6} align="center" w="100%" px={4} pt={{ base: 6 }} pb={{ base: 12, md: 16 }}>
        <Box color={COLORS.textDark} w="100%">
                    <Text
                    fontSize={{ base: 'xl', sm: '2xl', md: '2xl' }}
                    fontWeight="medium"
                    color={COLORS.primary}
                    textAlign="center"
                    pb={{ base: 3, sm: 5 }}
                    >
                    Sélectionnez votre image à traiter
                    </Text>
            <TraitementImageForm onSuccess={onSuccess} onError={onError} />
        </Box>
            {
                imagePayloadError ? 
                <Box w="100%" maxW="480px">
                    <ErrorMessage onClose={() => setImagePayloadError(null)} title={"Erreur lors du traitement de votre image"} 
                    description={`${imagePayloadError.message}`}/>
                </Box>

                : 
                <></>
            }
            {
                imagePayloadData ?         
                <VStack gap={4} align="center" w="100%" maxW="480px">
                    <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="semibold"
                    color={COLORS.textDark}
                    textAlign="center"
                    >
                    Votre image traitée
                    </Text>
                    <Image
                    src={`data:${imagePayloadData.mime_type};base64,${imagePayloadData.data}`}
                    alt="Image traitée"
                    w="100%"
                    maxH="480px"
                    objectFit="contain"
                    borderRadius="lg"
                    boxShadow="md"
                    bg={COLORS.backgroundCard}
                    />
                    <Button asChild variant="outline" w={{ base: "100%", md: "auto" }} borderColor={COLORS.boutonBordNonClique} color={COLORS.textDark}>
                        <a href={`data:${imagePayloadData.mime_type};base64,${imagePayloadData.data}`} download={`${crypto.randomUUID()}.${extFromMime(imagePayloadData.mime_type)}`}>
                            <LuDownload /> Télécharger l'image
                        </a>
                    </Button> 
                </VStack>
                : <></>
            }
    </VStack>


    </>)
}