import ScrollSyncTabBar from '@/components/home/scrollSync/ScrollSyncTabBar';
import { View } from 'react-native';

export default function HomeScreen() {
  
  return (
    <View className="flex-1 bg-white">
      <ScrollSyncTabBar />
    </View>
  );
};