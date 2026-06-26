import YellowClock from "@/assets/images/yellowClock.svg";
import Text from '@/components/common/Text';
import { useExpiringOffers } from "@/features/offers/useExpiringOffers";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import OfferList from "../offers/OfferList";

const START_SECONDS = 3 * 24 * 60 * 60; // 3d 0h 0m 0s = 259,200s
const RESET_SECONDS = 2 * 24 * 60 * 60 + 23 * 60 * 60 + 58 * 60; // 2d 23h 58m 0s = 259,080s

export default function ExpiringOffers() {

    const { data, isFetching, isFetched, isLoading } = useExpiringOffers({
        limit: 4,
    });

    const allOffers = useMemo(
        () => data?.pages.flatMap((page) => page.data) ?? [],
        [data]
    );

    const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= RESET_SECONDS) {
                    return START_SECONDS;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const days = Math.floor(secondsLeft / (24 * 3600));
    const hours = Math.floor((secondsLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return (
        <View className="flex-1 mt-5">
            <View className="mb-3 flex-row items-center justify-between bg-primary px-3 py-2">
                <View>
                    <View className="flex-row items-center gap-2">
                        <YellowClock width={20} height={20} />
                        <Text type="headerBold" className="text-base font-semibold text-white">
                            Expiring soon
                        </Text>
                    </View>

                    <Text className="mt-1 font-baloo text-xs text-white">
                        Time left:{" "}
                        <Text className="font-mono font-semibold text-white">
                            {days}d {hours}h {minutes}m {seconds}s
                        </Text>
                    </Text>
                </View>

                <Link href="/offers/expiring" asChild>
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