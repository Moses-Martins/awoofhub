import OfferInfiniteList from '@/components/offers/OfferInfiniteList';
import OfferListSkeleton from '@/components/offers/OfferListSkeleton';
import { useOffers } from '@/features/offers/useOffers';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { StatusBar, Text, View } from 'react-native';

export default function OffersScreen() {
    const { q } = useLocalSearchParams<{ q?: string }>();

    const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useOffers({
        search: q ?? "",
        category: "",
        minRating: 0,
        createdFrom: "",
        createdTo: "",
        limit: 8,
    });

    const allOffers = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? [];
    }, [data]);

    return (
        <View className="flex-1 bg-white">
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
            />


            <View className="flex-1 pt-4">
                {isLoading && <OfferListSkeleton number={8} />}

                {!isLoading && !isFetching && allOffers.length === 0 && (
                    <Text className="text-gray-500 text-center">No offers available.</Text>
                )}

                {isError && <Text className="text-red-500 text-center">{error?.message}</Text>}

                {!isLoading && allOffers.length > 0 &&
                    <OfferInfiniteList
                        offers={allOffers}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                }
            </View>
        </View>
    );
};