import React from "react";
import { Redirect } from "expo-router";

const Index = (): JSX.Element => {
  return <Redirect href="/(auth)/sign-in" />;
};

export default Index;
