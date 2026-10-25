import { Button, Dialog, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import { ChargementStatutEnumValue, type ChargementStatutEnum } from '../../enum/ChargementStatut';
import type { AnnonceSelect } from '../../types/AnnonceType';
import type { TypeMediaEnum } from '../../enum/TypeMediaEnum';
import AnnonceForm from '../form/AnnonceForm';
import { COLORS } from '../../theme/Couleur';

type BoutonAnnoncePropsType = {
    submitMessage: string;
    resetMessage: string;
    mediaType: TypeMediaEnum;
    annonce?: AnnonceSelect;
    size?: 'large' | 'small';
};

export function BoutonAnnonce({
    submitMessage,
    mediaType,
    resetMessage,
    annonce,
    size = annonce ? 'small' : 'large',
}: BoutonAnnoncePropsType) {
    const isLarge = size === 'large';

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
                    if (ChargementStatutEnumValue.Terminee === chargementStatut)
                        setChargementStatut(ChargementStatutEnumValue.Inactif);
                }
            }}
        >
            <Dialog.Trigger asChild>
                <Button
                    variant="outline"
                    color={COLORS.textLight}
                    background={COLORS.boutonInterieurClique}
                    border="2px solid"
                    borderColor={COLORS.boutonBordNonClique}
                    borderRadius="xl"
                    cursor="pointer"
                    h="auto"
                    flex="1"
                    minH={isLarge ? '40px' : '36px'}
                    py={2}
                    w={isLarge ? '300px' : '100%'}
                    maxW="100%"
                    whiteSpace="normal"
                    textAlign="center"
                    fontSize={isLarge ? { base: 'md', md: 'lg' } : 'sm'}
                    transitionProperty="colors"
                    transitionDuration="moderate"
                    _hover={{
                        background: COLORS.boutonInterieurNonClique,
                        color: COLORS.primary,
                    }}
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
                                setChargementStatut={(newStatut: ChargementStatutEnum) =>
                                    setChargementStatut(newStatut)
                                }
                                annonce={annonce}
                            />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
