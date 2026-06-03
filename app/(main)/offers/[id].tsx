import { useLogout } from "@/features/auth/useLogout";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function OfferIdScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { submit: logout } = useLogout({
    onSuccess: () => {
      router.replace('/login');
    },
  });
  return (
    <View>
      <Text>Offer is working now ooo {id}</Text>

      <TouchableOpacity
        onPress={() => logout()}
        className="mt-4 bg-orange-500 h-12 rounded-md items-center justify-center shadow-sm active:opacity-80"
      >
        <Text className="text-white text-base font-semibold font-baloo">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
