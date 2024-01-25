import { View, Text } from "react-native";

export const ErrorView = (): JSX.Element => (
    <View className='w-full h-3/4 flex-row justify-center item-center'>
        <Text>Something Went Wrong. Please try again!</Text>
    </View>
);