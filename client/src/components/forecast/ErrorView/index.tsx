import { View, Text } from "react-native";

export const ErrorView = (): JSX.Element => (
    <View className='w-full h-3/4 justify-center item-center'>
        <Text className="text-white self-center">Something Went Wrong. Please try again!</Text>
    </View>
);