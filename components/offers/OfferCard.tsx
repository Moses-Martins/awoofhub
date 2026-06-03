import { Offer } from '@/types/offer';

import { Link } from 'expo-router';
import { Star } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import WishlistButton from '../wishlist/WishlistButton';

interface Props {
  offer: Offer;
}

export default function OfferCard({ offer }: Props) {
  return (
    <View className="flex-1 max-w-[50%] bg-white h-[286px] rounded-xl shadow-sm border border-gray-100 p-2 flex flex-col">
      <View className="relative mb-3 mt-5 flex justify-center items-center h-25 bg-white">
        <WishlistButton position="absolute right-0 top-[-25] p-1" size={26} offerId={offer.id} />
        <Image source={{ uri: offer.imageUrl }} className="w-full h-[100px]" resizeMode="contain" />
      </View>

      <View className="flex-1">
        <Text numberOfLines={1} className="text-gray-900 font-baloo-bold text-sm mb-2">
          {offer.title}
        </Text>
        <Text numberOfLines={2} className="text-gray-500 font-mont text-xs mb-1">
          {offer.description}
        </Text>

        <View className="flex-row items-center mt-1 mb-4">
          <View className="flex-row -ml-0.5">
            <StarRatingDisplay
              rating={offer.avgRating}
              maxStars={5}
              starSize={12}
              StarIconComponent={({ type, size }) => {
                const iconSize = size;
                if (type === 'full') {
                  return <Star size={iconSize} color="#FFD700" fill="#FFD700" />;
                }
                if (type === 'half') {
                  return <Star size={iconSize} color="#ffe033" fill="#ffe033" opacity={0.7} />;
                }
                return <Star size={iconSize} color="#ccd1d8" fill="#ccd1d8" />;
              }}

              starStyle={{ marginHorizontal: -0.5 }}
            />

          </View>
          <Text className="text-[12px] font-mont text-gray-400 ml-1">
            ({offer.reviewCount})
          </Text>
        </View>
        <Link href={`/offers/${offer.id}`} asChild>
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-full bg-primary py-2 rounded-md items-center justify-center"
          >
            <Text className="text-white font-mont-bold text-sm sm:text-base">
              View More
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View >
  );
};

