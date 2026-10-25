import { Button, Dialog, Portal } from '@chakra-ui/react';
import { TypeImageEnumValue, type TypeImageEnum } from '../../enum/TypeImageEnum';
import { useState, type JSX } from 'react';
import { MarqueForm } from '../form/MarqueForm';
import { DeguisementForm } from '../form/DeguisementForm';
import ArticleForm from '../form/ArticleForm';
import type { ImageSelect } from '../../types/ImageType';
import { COLORS } from '../../theme/Couleur';

type BoutonCreationImagePropsType = {
    typeImageLabel: TypeImageEnum;
    typeImageValue: string;
    image?: ImageSelect;
    size?: 'large' | 'small';
};

export function BoutonModificationImage({
    typeImageLabel,
    typeImageValue,
    image,
    size = image ? 'small' : 'large',
}: BoutonCreationImagePropsType) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isLarge = size === 'large';

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
                        variant="outline"
                        color={COLORS.textLight}
                        background={COLORS.boutonInterieurClique}
                        border="2px solid"
                        borderColor={COLORS.boutonBordNonClique}
                        borderRadius="xl"
                        cursor="pointer"
                        whiteSpace="nowrap"
                        h={isLarge ? '40px' : '36px'}
                        w={isLarge ? '300px' : '100%'}
                        maxW="100%"
                        fontSize={isLarge ? { base: 'md', md: 'lg' } : 'sm'}
                        transitionProperty="colors"
                        transitionDuration="moderate"
                        _hover={{
                            background: COLORS.boutonInterieurNonClique,
                            color: COLORS.primary,
                        }}
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
