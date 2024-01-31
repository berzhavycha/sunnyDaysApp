import { ListItem } from '@/components/common';
import { Dispatch, SetStateAction } from 'react';
import { City } from '../../interfaces';

type RenderCityItemProps = {
    item: City
}

type UseCitySelectionReturnType = {
    renderCityItem: (args: RenderCityItemProps) => JSX.Element;
};

export const useCitySelection = (setCity: Dispatch<SetStateAction<string>>): UseCitySelectionReturnType => {
    const handleCitySelect = (selectedCity: string): void => {
        setCity(selectedCity)
    };

    const renderCityItem = ({ item }: RenderCityItemProps): JSX.Element => (
        <ListItem content={item.node.name} onItemClick={handleCitySelect} />
    );

    return { renderCityItem };
};
