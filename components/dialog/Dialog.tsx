import type { ReactNode } from 'react';
import { View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

type Props = {
  children: ReactNode;
  actionSheetRef: any;
};

export default function Dialog({ children, actionSheetRef }: Props) {
  return (
    <ActionSheet
      gestureEnabled
      indicatorStyle={{ width: 60, backgroundColor: 'gray' }}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
      }}
      ref={actionSheetRef}
    >
      <View className="grow h-[352px]">{children}</View>
    </ActionSheet>
  );
}