import { Button, Dialog, Portal } from '@chakra-ui/react';
import type { TYPE_IMAGE_TYPE } from '../../types/ImageType';
import { useState, type JSX } from 'react';
import { NewMarqueForm } from '../form/NewMarqueForm';
import { NewJouetForm } from '../form/NewJouetForm';
import { NewJeuDeSocieteForm } from '../form/NewJeuDeSocieteForm';
import { NewPelucheForm } from '../form/NewPelucheForm';

type BoutonCreationImagePropsType = {
    typeImageLabel: TYPE_IMAGE_TYPE;
    typeImageValue: 'Marque' | 'Jouet' | 'Jeu de société' | 'Peluche';
};

export function BoutonCreationImage({
    typeImageLabel,
    typeImageValue,
}: BoutonCreationImagePropsType) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function getForm(t: TYPE_IMAGE_TYPE): JSX.Element {
        switch (t) {
            case 'MARQUE':
                return <NewMarqueForm />;
            case 'JOUET':
                return <NewJouetForm />;
            case 'JEU DE SOCIETE':
                return <NewJeuDeSocieteForm />;
            case 'PELUCHE':
                return <NewPelucheForm />;
        }
        return <></>;
    }

    return (
        <>
            <Dialog.Root open={isOpen} onOpenChange={(value) => setIsOpen(value.open)}>
                <Dialog.Trigger asChild>
                    <Button
                        colorPalette="blue"
                        size={{ base: 'lg', sm: 'xl', md: '2xl' }}
                        my={{ base: 4, sm: 6, md: 10 }}
                    >
                        {`Ajouter un(e) ` + typeImageValue}
                    </Button>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content maxW={{ base: '70vw', sm: '50vw', md: '50vw' }}>
                            <Dialog.Body color="black">{getForm(typeImageLabel)}</Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}
