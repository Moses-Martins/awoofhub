import { Pressable, Text, View } from 'react-native';

import {
  Notification,
  NotificationType,
  useNotifications,
} from '@/store/notifications/notifications';

export const Toast = () => {
  const { notifications, dismissNotification } = useNotifications();

  if (!notifications.length) return null;

  return (
    <View className="absolute right-4 bottom-[80px] z-50">
      <View className="flex flex-col-reverse gap-3">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))}
      </View>
    </View>
  );
};

const notificationVariants: Record<
  NotificationType,
  string
> = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-orange-500',
  error: 'bg-red-500',
};

type NotificationToastProps = {
  notification: Omit<Notification, 'duration'>;
  onDismiss: (id: string) => void;
};

const NotificationToast = ({
  notification,
  onDismiss,
}: NotificationToastProps) => {
  const { id, type, title, message } = notification;

  return (
    <View
      className={`w-[300px] rounded-lg p-3 shadow-md ${notificationVariants[type]}`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-2">
          <Text className="text-white text-base font-semibold">
            {title}!
          </Text>

          {!!message && (
            <Text className="text-white/80 text-sm mt-1">
              {message}
            </Text>
          )}
        </View>

        <Pressable
          onPress={() => onDismiss(id)}
          className="ml-2"
        >
          <Text className="text-white text-lg font-bold">
            ✕
          </Text>
        </Pressable>
      </View>
    </View>
  );
};