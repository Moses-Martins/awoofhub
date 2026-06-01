import ScrollSyncTabBar from '@/components/home/scrollSync/ScrollSyncTabBar';
import { useCategory } from '@/features/category/useCategory';
import { View } from 'react-native';

export default function HomeScreen() {
  const { data, isFetching, isFetched } = useCategory()


  return (
    <View className="flex-1 bg-white">

      <ScrollSyncTabBar />

    </View>
  );
};