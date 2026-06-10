import ActivityInfintiteList from "@/components/activity/ActivityInfiniteList";
import ActivitySkeleton from "@/components/activity/ActivitySkeleton";
import { useActivity } from "@/features/activity/useActivity";
import { Text, View } from "react-native";

export default function NotificationScreen() {

  const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useActivity({
    limit: 8,
  });

  const allActivity = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View className="flex-1 pt-4">
      {isLoading && <ActivitySkeleton number={8} />}

      {!isLoading && !isFetching && allActivity.length === 0 && (
        <Text className="text-gray-500 text-center">No offers available.</Text>
      )}

      {isError && <Text className="text-red-500 text-center">{error?.message}</Text>}

      {!isLoading && allActivity.length > 0 &&
        <ActivityInfintiteList
          activities={allActivity}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
    </View>
  );
}
