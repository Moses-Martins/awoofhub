import { useUser } from '@/features/user/useUser';
import { capitalizeFirstLetter } from '@/utils/truncate';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

export default function Avatar() {
    const { data: user } = useUser();
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return (
        <Pressable onPress={() => navigation.openDrawer()}>
            {user?.profileImageUrl ? (
                <Image
                    source={{ uri: user.profileImageUrl }}
                    className="w-[40px] h-[40px] rounded-full"
                />
            ) : (
                <View className="w-[40px] h-[40px] bg-gray-400 justify-center items-center rounded-full">
                    <Text className="text-black text-lg font-bold">
                        {capitalizeFirstLetter(user?.name || 'A')}
                    </Text>
                </View>
            )}
        </Pressable>
    );
};
