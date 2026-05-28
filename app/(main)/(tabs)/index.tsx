import Header from '@/components/header/Header';
import OfferInfiniteList from '@/components/offers/OfferInfiniteList';
import OfferListSkeleton from '@/components/offers/OfferListSkeleton';
import { useRandomInfiniteOffers } from '@/features/offers/useRandomInfiniteOffers';
import { useMemo } from 'react';
import { StatusBar, Text, View } from 'react-native';

export default function HomeScreen() {
  const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useRandomInfiniteOffers({
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
      <Header />
      
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