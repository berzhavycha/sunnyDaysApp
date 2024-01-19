import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { View, Text } from "react-native";
import { SAY_HELLO_QUERY } from "@/apollo";
import { Button } from "@/components";

const ForecastScreen = (): JSX.Element => {
  const { loading: loading1, error: error1, data: data1 } = useQuery(SAY_HELLO_QUERY);
  const [query, { loading, error, data }] = useLazyQuery(SAY_HELLO_QUERY);

  if (loading1) return <Text>Loading...</Text>;
  if (error1) return <Text>Error: {error1.message}</Text>;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log(data);

  const helloMessage = data1.sayHello;

  return (
    <View className="flex-1 justify-center items-center bg-gray-900">
      <Button
        text="CLICK"
        onPress={() => {
          query();
        }}
      />
      <Text>{helloMessage}</Text>
    </View>
  );
};

export default ForecastScreen;
