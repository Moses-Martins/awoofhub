import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

interface Props {
  number: number;
}

export default function ActivityListSkeleton({ number }: Props) {
  return (
    <View className="gap-4">
      {Array.from({ length: number }).map((_, i) => (
        <View
          key={i}
          className="bg-white rounded-2xl border border-gray-100 p-4 flex-row items-center gap-4"
        >
          <Skeleton radius="round" width={64} height={64} colors={['#F9FAFB', '#E5E7EB']} />

          <View className="flex-1">
            <View className="flex-row justify-between mb-2">
              <Skeleton width={100} height={20} colors={['#F9FAFB', '#E5E7EB']} />
              <Skeleton width={80} height={16} colors={['#F9FAFB', '#E5E7EB']} />
            </View>

            <Skeleton width={180} height={16} colors={['#F9FAFB', '#E5E7EB']} />
          </View>
        </View>
      ))}
    </View>
  );
}