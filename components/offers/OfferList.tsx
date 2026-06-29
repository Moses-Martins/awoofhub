import { Offer } from '@/types/offer';
import { FlatList, Text, View } from 'react-native';
import OfferCard from './OfferCard';
import OfferListSkeleton from './OfferListSkeleton';

interface Props {
  offers: Offer[];
  isLoading: boolean;
  isFetched: boolean,
  isFetching: boolean,
}

export default function OfferList({ offers, isLoading, isFetching, isFetched }: Props) {

  const previewOffers = isLoading
    ? Array.from({ length: 4 }, (_, i) => ({ id: `skeleton-${i}` } as Offer))
    : offers.slice(0, 4);

  return (
    <View className="px-3">
      <FlatList
        data={previewOffers}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperClassName="gap-3"
        contentContainerClassName="gap-3"
        renderItem={({ item }) => {
          if (isLoading) {
            return <OfferListSkeleton />;
          }
          return <OfferCard offer={item} />;
        }}
        keyExtractor={item => item.id ?? ''}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={() => {
          if (!isFetching && isFetched && offers.length === 0) {
            return (
              <View className="pt-5">
                <Text className="text-gray-500 text-center">
                  No offers available.
                </Text>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
}