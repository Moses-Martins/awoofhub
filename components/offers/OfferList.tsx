import { Offer } from '@/types/offer';
import { FlatList, View } from 'react-native';
import OfferCard from './OfferCard';

interface Props {
  offers: Offer[];
}

export default function OfferList({ offers }: Props) {
  const previewOffers = offers.slice(0, 4);

  return (
    <View className="px-3">
      <FlatList
        data={previewOffers}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperClassName="gap-3"
        contentContainerClassName="gap-3"
        renderItem={({ item }) => <OfferCard offer={item} />}
        keyExtractor={item => item.id ?? ''}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </View>
  );
}