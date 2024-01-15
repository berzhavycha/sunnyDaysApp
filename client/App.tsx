import { View, Text } from "react-native";
import { ApolloProvider } from '@apollo/client';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <View>
        <Text>Some dummy text</Text>
      </View>
    </ApolloProvider>
  );
}
