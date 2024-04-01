import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CustomTouchable } from '@/components/common';
import { useDeleteWeatherSubscription } from '@/hooks';

type Props = {
  city: string;
  onClose: () => void;
};

export const DeletionModal: FC<Props> = ({ city, onClose }) => {
  const { deleteSubscription } = useDeleteWeatherSubscription();

  const onDelete = async (): Promise<void> => {
    onClose();
    await deleteSubscription(city);
  };

  return (
    <View className="flex w-60 bg-white flex-col items-center p-3 pb-2 rounded-md shadow-lg">
      <Text className="mb-6 text-md">Are you sure you want to delete {city}?</Text>
      <View className="w-full flex flex-row gap-2 justify-end">
        <CustomTouchable onPress={onDelete} style={styles.okButton}>
          <Text className="text-white">Ok</Text>
        </CustomTouchable>
        <CustomTouchable onPress={onClose} style={styles.cancelButton}>
          <Text>Cancel</Text>
        </CustomTouchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  okButton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: 'lightgray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
