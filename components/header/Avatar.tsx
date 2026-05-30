import { useUser } from '@/features/user/useUser';
import { capitalizeFirstLetter } from '@/utils/truncate';
import { Image, Text, View } from 'react-native';

export default function Avatar() {
    const { data: user } = useUser();

    return (
        <View>
            {user?.profileImageUrl ? (
                <Image
                    source={{ uri: user.profileImageUrl }}
                    className="w-[35px] h-[35px] rounded-full"
                />
            ) : (
                <View className="w-[35px] h-[35px] bg-gray-400 justify-center items-center rounded-full">
                    <Text className="text-black text-lg font-bold">
                        {capitalizeFirstLetter(user?.name || 'A')}
                    </Text>
                </View>
            )}
        </View>
    );
};
