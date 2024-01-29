import { ListItem } from '@/components/common';
import { Dispatch, SetStateAction } from 'react';
import { City } from '../../interfaces';

type UseCitySelectionReturnType = {
    renderCityItem: (args: { item: City }) => JSX.Element;
};

export const useCitySelection = (setCity: Dispatch<SetStateAction<string>>): UseCitySelectionReturnType => {
    const handleCitySelect = (selectedCity: string): void => {
        setCity(selectedCity)
    };

    const renderCityItem = ({ item }: { item: City }): JSX.Element => (
        <ListItem content={item.node.name} onItemClick={handleCitySelect} />
    );

    return { renderCityItem };
};
