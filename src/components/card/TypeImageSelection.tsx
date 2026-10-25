import { Portal, Select } from '@chakra-ui/react';
import { type TypeImageEnum, typeImageCollection } from '../../enum/TypeImageEnum';
import { COLORS } from '../../theme/Couleur';

type TypeImageSelectionPropsType = {
    setTypeImage: React.Dispatch<React.SetStateAction<TypeImageEnum[]>>;
    typeImage: TypeImageEnum[];
};
export default function TypeImageSelection({
    typeImage,
    setTypeImage,
}: TypeImageSelectionPropsType) {
    return (
        <>
            <Select.Root
                gap={{ base: '3', sm: '5' }}
                collection={typeImageCollection}
                value={typeImage}
                onValueChange={(e) => setTypeImage(e.value as TypeImageEnum[])}
                size="md"
                variant="outline"
                colorPalette="teal"
                color={COLORS.primary}
                width="300px"
            >
                <Select.HiddenSelect />
                <Select.Label textAlign="center" fontSize={{ base: 'xl', sm: '2xl', md: '2xl' }}>
                    Type d'image
                </Select.Label>
                <Select.Control>
                    <Select.Trigger borderColor={COLORS.primary} borderWidth="2px">
                        <Select.ValueText
                            fontSize={{ base: 'md', sm: 'lg', md: 'lg' }}
                            color={COLORS.textDark}
                            placeholder="Sélectionner le type d'image"
                        />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {typeImageCollection.items.map((t) => (
                                <Select.Item
                                    color="black"
                                    borderColor="black"
                                    fontSize={{ base: 'md', sm: 'md', md: 'lg' }}
                                    item={t}
                                    key={t.label}
                                >
                                    {t.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </>
    );
}
