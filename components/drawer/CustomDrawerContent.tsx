import { useLogout } from "@/features/auth/useLogout";
import { useUser } from "@/features/user/useUser";
import { Href, useNavigationContainerRef, useRouter } from "expo-router";
import { DrawerActions } from "expo-router/build/react-navigation";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function CustomDrawerContent() {
    const router = useRouter();
    const { data: user } = useUser();
    const rootNavRef = useNavigationContainerRef();

    const navigate = (href: Href) => {
        if (rootNavRef.isReady()) {
            rootNavRef.dispatch(DrawerActions.closeDrawer());
        }
        router.push(href);
    };

    const { submit: logout } = useLogout({
        onSuccess: () => {
            if (rootNavRef.isReady()) {
                rootNavRef.dispatch(DrawerActions.closeDrawer());
            }
            router.replace('/login');
        },
    });

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingTop: 60,
                paddingBottom: 20,
            }}
            className="bg-white"
        >
            <Text className="text-xl font-bold mx-5 mb-5">
                Welcome!
            </Text>

            <View className="gap-4 px-5">
                <Pressable onPress={() => navigate(`/profile/${user.id}`)} className="py-3">
                    <Text className="text-lg">Profile</Text>
                </Pressable>

                <Pressable onPress={() => navigate("/")} className="py-3 active:opacity-60">
                    <Text className="text-lg">Help & Support</Text>
                </Pressable>

                <Pressable onPress={() => logout()} className="py-3 active:opacity-60">
                    <Text className="text-lg text-red-500">Logout</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}