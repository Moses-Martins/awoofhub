import { Bell } from 'lucide-react-native';
import { View } from 'react-native';

function OfferCreatedNotificationIcon() {
    return <Bell size={24} color="#EA580C" />;
}

function LikeNotificationIcon() {
    return <Bell size={24} color="#EA580C" />;
}

const ActivityIcons = {
    OFFER_CREATED: OfferCreatedNotificationIcon,
    POST_LIKE: LikeNotificationIcon,
};

export type ActivityType = keyof typeof ActivityIcons;

export function ActivityIcon({ type }: { type: ActivityType }) {
    const Icon = ActivityIcons[type];

    return (
        <View className="bg-orange-50 rounded-full p-2">
            <Icon />
        </View>
    );
}