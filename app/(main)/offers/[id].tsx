import Loading from "@/components/loading/Loading";
import OfferInfo from "@/components/offer/OfferInfo";
import { useLogout } from "@/features/auth/useLogout";
import { useOffer } from "@/features/offers/useOffer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function OfferInfoScreen() {
  const { id: rawId } = useLocalSearchParams();
  const router = useRouter();

  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const { data: offer, isLoading } = useOffer({ id });

  const { submit: logout } = useLogout({
    onSuccess: () => {
      router.replace('/login');
    },
  });

  if (isLoading) {
    return <Loading />
  }

  if (!offer) {
    return (
      <View className="pt-14 px-6">
        <Text className="text-center text-gray-500">
          Offer not found.
        </Text>
      </View>
    );
  }


  return (
    <View className="flex-1 bg-white">
      <OfferInfo offer={offer} />
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
