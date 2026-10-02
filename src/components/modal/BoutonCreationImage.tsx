import { Button, Dialog, Portal } from '@chakra-ui/react';
import { TYPE_IMAGE_VALUE, type TYPE_IMAGE_TYPE } from '../../types/ImageType';
import { useState, type JSX } from 'react';
import { NewMarqueForm } from '../form/NewMarqueForm';
import { NewJouetForm } from '../form/NewJouetForm';
import { NewJeuDeSocieteForm } from '../form/NewJeuDeSocieteForm';
import { NewPelucheForm } from '../form/NewPelucheForm';
import { NewEditeurForm } from '../form/NewEditeurForm';
import { NewLoisirCreatifForm } from '../form/NewLoisirCreatifForm';
import { NewLivreForm } from '../form/NewLivreForm';
import { NewDeguisementForm } from '../form/NewDeguisementForm';

type BoutonCreationImagePropsType = {
    typeImageLabel: TYPE_IMAGE_TYPE;
    typeImageValue: string;
};

export function BoutonCreationImage({
    typeImageLabel,
    typeImageValue,
}: BoutonCreationImagePropsType) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function getForm(t: TYPE_IMAGE_TYPE): JSX.Element {
        switch (t) {
            case TYPE_IMAGE_VALUE.MARQUE:
                return <NewMarqueForm />;
            case TYPE_IMAGE_VALUE.JOUET:
                return <NewJouetForm />;
            case TYPE_IMAGE_VALUE.JEU_DE_SOCIETE:
                return <NewJeuDeSocieteForm />;
            case TYPE_IMAGE_VALUE.PELUCHE:
                return <NewPelucheForm />;
            case TYPE_IMAGE_VALUE.EDITEUR:
                return <NewEditeurForm />;
            case TYPE_IMAGE_VALUE.LOISIR_CREATIF:
                return <NewLoisirCreatifForm />;
            case TYPE_IMAGE_VALUE.LIVRE:
                return <NewLivreForm />;
            case TYPE_IMAGE_VALUE.DEGUISEMENT:
                return <NewDeguisementForm />;
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
