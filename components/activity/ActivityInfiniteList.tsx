import { ActivityData } from '@/types/activity';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Activity from './Activity';

interface Props {
  activities: ActivityData[];
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
}

export default function ActivityInfintiteList({
  activities,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: Props) {
  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id ?? ''}
      renderItem={({ item }) => <Activity prop={item} />}

      contentContainerClassName="gap-2 px-3"

      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage?.();
        }
      }}
      onEndReachedThreshold={0.5}

      ListFooterComponent={() => (
        <View className="py-5 items-center">
          {isFetchingNextPage && (
            <ActivityIndicator size="large" />
          )}

          {!hasNextPage && activities.length > 0 && (
            <Text className="text-gray-400 text-sm">
              No more activities
            </Text>
          )}
        </View>
      )}
    />
  );
}