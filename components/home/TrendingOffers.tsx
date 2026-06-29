import YellowFlame from "@/assets/images/yellowFlame.svg";
import Text from '@/components/common/Text';
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Pressable, View } from "react-native";

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
        <View className="flex-1 mt-5 mb-3">
            <View className="bg-primary flex-row items-center justify-between px-3 py-2 mb-3">
                <View className="flex-row items-center gap-2">
                    <YellowFlame width={20} height={20} />

                    <Text type="headerBold" className="text-base text-white">
                        Trending now
                    </Text>
                </View>

                <Link href="/offers/trending" asChild>
                    <Pressable className="flex-row items-center gap-1">
                        <Text type="header" className="text-sm text-white">
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