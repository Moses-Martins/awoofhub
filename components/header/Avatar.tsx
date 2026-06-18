import { useUser } from '@/features/user/useUser';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { Image, Pressable, View } from 'react-native';

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
                <View className="w-[40px] h-[40px] bg-gray-300 justify-center items-center rounded-full">
                    <FontAwesome name="user" size={24} color="gray" />
                </View>
            )}
        </Pressable>
    );
};
