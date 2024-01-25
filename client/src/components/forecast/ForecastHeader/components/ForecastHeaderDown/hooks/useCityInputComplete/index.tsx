import { City, CityQuery, QueryVariables } from '../../interfaces';
import { GET_CITIES } from '@/apollo';
import { useInputCompleteQuery } from '@/hooks';
import { REACT_APP_GEODB_CLIENT_NAME } from '@env';
import { getCitiesQueryVariables, extractData } from '../../utils';

type UseCityInputCompleteReturn = {
    data: City[];
    loading: boolean;
};

export const useCityInputComplete = (city: string): UseCityInputCompleteReturn => {
    const { data, loading } = useInputCompleteQuery<CityQuery, City, QueryVariables>(
        GET_CITIES,
        city,
        getCitiesQueryVariables(city),
        { clientName: REACT_APP_GEODB_CLIENT_NAME },
        extractData
    )

    return { data, loading };
};
