import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { View, Text } from "react-native";
import { SAY_HELLO_QUERY, SIGH_OUT_MUTATION } from "@/apollo";
import { Button } from "@/components";
import { useAuth } from "@/context";

const ForecastScreen = (): JSX.Element => {
  const { loading: loading1, error: error1, data: data1 } = useQuery(SAY_HELLO_QUERY);
  const [query, { loading, error, data }] = useLazyQuery(SAY_HELLO_QUERY);
  // const { authState, onSignOut } = useAuth()
  // const [signOutMutation] = useMutation(SIGH_OUT_MUTATION, {
  //   variables: {
  //     authorization: `Bearer ${authState.refreshToken}`,
  //   },
  // });

  if (loading1) return <Text>Loading...</Text>;
  if (error1) return <Text>Error: {error1.message}</Text>;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log(data);

  const helloMessage = data1.sayHello;

  const handleSignOut = async (): Promise<void> => {
    // signOutMutation();
    // await onSignOut();
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-900">
      <Button
        text="CLICK"
        onPress={() => {
          query();
        }}
      />
      <Button
        text="SIGN OUT"
        onPress={async () => await handleSignOut()}
      />
      <Text>{helloMessage}</Text>
    </View>
  );
};

export default ForecastScreen;
