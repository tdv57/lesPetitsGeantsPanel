import { createListCollection } from '@chakra-ui/react';

export function mapAge(age: string | undefined, typeAge: 'ANS' | 'MOIS' | undefined): string {
    let intAge = age ? parseInt(age) : undefined;
    if (!intAge || intAge < 0 || !typeAge || (typeAge !== 'ANS' && typeAge !== 'MOIS')) {
        return '';
    }
    if (typeAge === 'ANS') {
        if (intAge === 1 || intAge === 0) {
            return 'Dès ' + intAge + ' an';
        } else {
            return 'Dès ' + intAge + ' ans';
        }
    } else if (typeAge === 'MOIS') {
        return 'Dès ' + intAge + ' mois';
    }
    return '';
}

export const typeAgeCollection = createListCollection({
    items: [
        { label: 'Aucun', value: '' },
        { label: 'Ans', value: 'ANS' },
        { label: 'Mois', value: 'MOIS' },
    ],
});
