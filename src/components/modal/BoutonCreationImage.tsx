import { Button, Dialog, Portal } from '@chakra-ui/react';
import { TypeImageEnumValue, type TypeImageEnum } from '../../enum/TypeImageEnum';
import { useState, type JSX } from 'react';
import { MarqueForm } from '../form/MarqueForm';
import { DeguisementForm } from '../form/DeguisementForm';
import ArticleForm from '../form/ArticleForm';
import type { ImageSelect } from '../../types/ImageType';

type BoutonCreationImagePropsType = {
    typeImageLabel: TypeImageEnum;
    typeImageValue: string;
    image?: ImageSelect;
};

export function BoutonModificationImage({
    typeImageLabel,
    typeImageValue,
    image,
}: BoutonCreationImagePropsType) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function getForm(t: TypeImageEnum): JSX.Element {
        if (t === TypeImageEnumValue.MARQUE) {
            return <MarqueForm key={image ? 'update' : 'new'} marque={image} onSuccess={close} />;
        } else if (t === TypeImageEnumValue.DEGUISEMENT) {
            return (
                <DeguisementForm
                    key={image ? 'update' : 'new'}
                    deguisement={image}
                    onSuccess={close}
                />
            );
        } else {
            return (
                <ArticleForm
                    key={image ? 'update' : 'new'}
                    typeArticle={t}
                    article={image}
                    onSuccess={close}
                />
            );
        }
    }

    const close = () => setIsOpen(false);

    return (
        <>
            <Dialog.Root open={isOpen} onOpenChange={(value) => setIsOpen(value.open)}>
                <Dialog.Trigger asChild>
                    <Button
                        colorPalette="blue"
                        size={{ base: 'lg', sm: 'xl', md: '2xl' }}
                        my={{ base: 4, sm: 6, md: 10 }}
                    >
                        {image
                            ? `Modifier un(e) ` + typeImageValue
                            : `Ajouter un(e) ` + typeImageValue}
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
