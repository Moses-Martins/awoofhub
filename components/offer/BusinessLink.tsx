import { colors } from "@/styles/colors";
import { Offer } from "@/types/offer";
import { FontAwesome } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
    offer: Offer;
}

function capitalizeFirstLetter(str: string) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
}

export default function BusinessLink({ offer }: Props) {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.push(`/profile/${offer.business.id}`)}
            className="flex-row items-center gap-2"
        >
            {/* Avatar */}
            {offer.business.profileImageUrl ? (
                <Image
                    source={{ uri: offer.business.profileImageUrl }}
                    className="w-[40px] h-[40px] rounded-full"
                />
            ) : (
                <View className="w-[40px] h-[40px] bg-gray-300 justify-center items-center rounded-full">
                    <FontAwesome name="user" size={24} color="gray" />
                </View>
            )}

            {/* Name + chevron */}
            <View className="flex-row items-center">
                <Text className="text-primary text-base font-mont-bold">
                    {offer.business.name}
                </Text>

                <Entypo name="chevron-right" size={20} color={colors.primary} />
            </View>
        </Pressable>
    );
}