export type City = {
  node: {
    name: string;
  };
};

export type CityQuery = {
  populatedPlaces: {
    edges: City[];
  };
};

export type QueryVariables = {
  namePrefix: string;
  sort: string;
  first: number;
};
