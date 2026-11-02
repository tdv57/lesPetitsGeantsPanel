import { Alert, CloseButton } from '@chakra-ui/react';

type ErrorMessagePropsType = {
    title: string;
    description: string;
    onClose: () => void;
};

export function ErrorMessage({ title, description, onClose }: ErrorMessagePropsType) {
    return (
        <>
            <Alert.Root status="error" variant="subtle" borderRadius="md" alignItems="flex-start">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Title>{title}</Alert.Title>
                    <Alert.Description>{description}</Alert.Description>
                </Alert.Content>
                <CloseButton size="sm" pos="relative" top="-2" insetEnd="-2" onClick={onClose} />
            </Alert.Root>
        </>
    );
}
