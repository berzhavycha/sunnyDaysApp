import { FC } from "react";
import { Pressable, Text } from "react-native";

type IProps = {
  text: string;
  onPress: () => void;
};

export const Button: FC<IProps> = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress} className="bg-blue-500 p-2 w-64 rounded">
      <Text className="text-white text-center font-bold">{text}</Text>
    </Pressable>
  );
};
