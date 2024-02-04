export type City = {
  node: {
    name: string;
  };
};

export type CityQueryResponse = {
  populatedPlaces: {
    edges: City[];
  };
};

export type QueryVariables = {
  namePrefix: string;
  sort: string;
  first: number;
};
