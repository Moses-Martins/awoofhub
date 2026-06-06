import OfferInfiniteList from '@/components/offers/OfferInfiniteList';
import OfferListSkeleton from '@/components/offers/OfferListSkeleton';
import { useOffersByUser } from '@/features/offers/useoffersByUser';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function OfferScreen() {
    const { id: rawId } = useLocalSearchParams();
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useOffersByUser({
        userId: id, search: "", category: "", minRating: 0, createdFrom: "", createdTo: "", limit: 8
    });

    const allOffers = data?.pages.flatMap((page) => page.data) ?? [];

    return (
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
    );
};