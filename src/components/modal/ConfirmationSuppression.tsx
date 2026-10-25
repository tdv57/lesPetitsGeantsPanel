import { Button, Dialog, Portal, VStack } from '@chakra-ui/react';
import { useState } from 'react';

type ConfirmationSuppressionPropsType = {
    id: number;
    handleDelete: (id: number) => void;
};
export default function ConfirmationSuppression({
    id,
    handleDelete,
}: ConfirmationSuppressionPropsType) {
    const [isOpen, setIsOpen] = useState(false);

    function onDelete() {
        handleDelete(id);
        setIsOpen(false);
    }
    return (
        <>
            <VStack align="center" w="100%" h="100%">
                <Dialog.Root
                    open={isOpen}
                    onOpenChange={(details) => setIsOpen(details.open)}
                    placement="center"
                >
                    <Dialog.Trigger asChild>
                        <Button
                            variant="solid"
                            bg="red.500"
                            color="white"
                            border="2px solid"
                            borderColor="red.500"
                            borderRadius="xl"
                            minH="36px"
                            flex="1"
                            w="100%"
                            fontSize="sm"
                            cursor="pointer"
                            transitionProperty="colors"
                            transitionDuration="moderate"
                            _hover={{ bg: 'transparent', color: 'red.500' }}
                            onClick={() => setIsOpen(true)}
                        >
                            Supprimer
                        </Button>
                    </Dialog.Trigger>

                    <Portal>
                        <Dialog.Backdrop />

                        <Dialog.Positioner>
                            <Dialog.Content
                                bg="gray.800"
                                maxW={{ base: '70vw', sm: '50vw', md: '50vw' }}
                                minH={{ base: '30vh', sm: '50vh', md: '50vh' }}
                            >
                                <Dialog.Body
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Button colorPalette="red" onClick={() => onDelete()}>
                                        Confirmer la suppression
                                    </Button>
                                </Dialog.Body>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </VStack>
        </>
    );
}
