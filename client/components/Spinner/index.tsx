import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Spinner = () => (
  <View className="flex-1 justify-center items-center bg-gray-900">
    <View>
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  </View>
);
