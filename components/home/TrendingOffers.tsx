import YellowFlame from "@/assets/images/yellowFlame.svg";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router"; // or useNavigation()
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { useTrendingOffers } from "@/features/offers/useTrendingOffers";
import OfferList from "../offers/OfferList";

export default function TrendingOffers() {

    const { data, isFetching, isFetched, isLoading } = useTrendingOffers({
        limit: 4,
    });

    const allOffers = useMemo(
        () => data?.pages.flatMap((page) => page.data) ?? [],
        [data]
    );



    return (
        <View className="flex-1 pt-5 bg-gray-50">
            <View className="bg-primary flex-row items-center justify-between px-3 py-2 mb-3">
                <View className="flex-row items-center gap-2">
                    <YellowFlame width={20} height={20} />

                    <Text className="text-base font-semibold text-white md:text-xl">
                        Trending now
                    </Text>
                </View>

                <Link href="/offers/trending" asChild>
                    <Pressable className="flex-row items-center gap-1">
                        <Text className="font-medium text-sm text-white">
                            View all
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="white"
                        />
                    </Pressable>
                </Link>
            </View>

            <OfferList offers={allOffers} isLoading={isLoading} isFetching={isFetching} isFetched={isFetched} />
        </View>
    );
}