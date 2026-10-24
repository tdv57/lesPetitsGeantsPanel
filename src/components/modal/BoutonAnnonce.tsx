import { Button, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { ChargementStatutEnumValue, type ChargementStatutEnum } from "../../enum/ChargementStatut";
import type { AnnonceSelect } from "../../types/AnnonceType";
import type { TypeMediaEnum } from "../../enum/TypeMediaEnum";
import AnnonceForm from "../form/AnnonceForm";

type BoutonAnnoncePropsType = {
    submitMessage: string;
    resetMessage: string;
    mediaType: TypeMediaEnum;
    annonce?: AnnonceSelect;
};

export function BoutonAnnonce({ submitMessage, mediaType, resetMessage, annonce }: BoutonAnnoncePropsType) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [chargementStatut, setChargementStatut] = useState<ChargementStatutEnum>(
        ChargementStatutEnumValue.Inactif,
    );


    return (
        <Dialog.Root
            size={{ base: 'xs' }}
            open={isOpen}
            onOpenChange={(details) => {
                if (details.open) setIsOpen(true);
                else {
                    setIsOpen(false);
                    if (ChargementStatutEnumValue.Terminee === chargementStatut) setChargementStatut(ChargementStatutEnumValue.Inactif);
                }
            }}
        >
            <Dialog.Trigger asChild>
                <Button
                    colorPalette="blue"
                    size={{ base: 'lg', sm: 'xl', md: '2xl' }}
                    my={{ base: 4, sm: 6, md: 10 }}
                >
                    {submitMessage}
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content maxW={{ base: '70vw', sm: '50vw', md: '50vw' }}>
                        <Dialog.Body color="black">
                            <AnnonceForm
                                mediaType={mediaType}
                                submitMessage={submitMessage}
                                resetMessage={resetMessage}
                                chargementStatut={chargementStatut}
                                setChargementStatut={(newStatut: ChargementStatutEnum) => setChargementStatut(newStatut)}
                                annonce={annonce}
                            />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>

        </Dialog.Root>
    )
}