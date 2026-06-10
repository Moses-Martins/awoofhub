import { cn } from '@/utils/cn';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { ActivityIcon, ActivityType } from './ActivityIcon';


interface ActivityCardProps extends PressableProps {
  title: string;
  type: ActivityType;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ActivityCard({
  type,
  title,
  isRead,
  createdAt,
  message,
  ...rest
}: ActivityCardProps) {
  return (
    <Pressable
      className={cn(
        'w-full border border-gray-100 rounded-2xl p-4 shadow-sm flex-row items-start gap-4',
        !isRead ? 'bg-orange-50' : 'bg-white'
      )}
      {...rest}
    >
      {/* Icon Section */}
      <View className="shrink-0">
        <View className="bg-orange-50 p-3 rounded-full">
          <ActivityIcon type={type} />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row justify-between items-start mb-1">
          <Text
            className="flex-1 text-lg font-semibold text-gray-800"
            numberOfLines={1}
          >
            {title}
          </Text>

          <Text className="text-orange-500 text-xs font-semibold ml-2">
            {formatTimeAgo(createdAt)}
          </Text>
        </View>

        <Text
          className="text-gray-500 text-sm leading-5"
          numberOfLines={2}
        >
          {message}
        </Text>
      </View>
    </Pressable>
  );
}