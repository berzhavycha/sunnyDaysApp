import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { errorLink, refreshTokenLink, mainHttpLink } from './links';

type WeatherData = {
};

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          userCitiesWeather: {
            merge: (existing: WeatherData[] | undefined, incoming: WeatherData[]): WeatherData[] => {
              return incoming;
            }
          }
        },
      },
    },
  }),
});

export const apolloLinks = ApolloLink.from([
  errorLink.split(
    (operation) => operation.getContext().unauthenticated,
    refreshTokenLink(apolloClient),
  ),
  mainHttpLink,
]);

apolloClient.setLink(apolloLinks);
