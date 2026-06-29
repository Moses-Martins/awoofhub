import Flame from "@/assets/images/flame.svg";
import Text from '@/components/common/Text';
import { Offer } from "@/types/offer";
import { differenceInSeconds, parseISO } from "date-fns";
import { Link } from "expo-router";
import { AlarmClock, Star, User, Users } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import WishlistButton from "../wishlist/WishlistButton";

interface Props {
  offer: Offer;
}

function getOfferVariant(offer: Offer) {
  const isTrending = offer.clickCount >= 1;

  const secondsLeft = differenceInSeconds(
    parseISO(offer.endDate),
    new Date()
  );

  const isExpiring =
    secondsLeft >= 0 && secondsLeft <= 60 * 60 * 24 * 3;

  if (isTrending && isExpiring) return "trending-expiring";
  if (isTrending) return "trending";
  if (isExpiring) return "expiring";

  return "regular";
}

function formatCountdown(seconds: number) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  return `${days}d ${hours}h ${mins}m`;
}

export default function OfferCard({ offer }: Props) {
  const variant = useMemo(() => getOfferVariant(offer), [offer]);

  const hasCountdown =
    variant === "expiring" ||
    variant === "trending-expiring";

  const [secondsLeft, setSecondsLeft] = useState(
    Math.max(
      0,
      differenceInSeconds(parseISO(offer.endDate), new Date())
    )
  );

  useEffect(() => {
    if (!hasCountdown) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasCountdown]);

  return (

    <Link href={`/offers/${offer.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.9}
        className="flex-1 max-w-[50%] bg-white rounded-xl border border-gray-100 p-2"
      >
        <View className="relative items-center justify-center h-28 mb-3">
          {(variant === "trending" ||
            variant === "trending-expiring") && (
              <View className="absolute left-0 top-0 bg-white rounded-full p-1 z-10">
                <Flame width={18} height={18} />
              </View>
            )}

          <View className="absolute right-0 top-0 bg-white rounded-full p-1 z-10">
            <WishlistButton
              size={20}
              offerId={offer.id}
            />
          </View>

          <Image
            source={{ uri: offer.imageUrl }}
            className="w-full h-[100px] rounded-lg"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-1">

          {/* Username */}
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-primary text-[11px]">
              @{offer.contributor.username}
            </Text>

            <View className="flex-row items-center bg-orange-100 rounded-full px-2 py-1">
              <User size={10} color="#ff5b00" />
              <Text className="text-primary text-[10px] ml-1">
                Awoofer
              </Text>
            </View>
          </View>

          <Text
            type="headerBold"
            numberOfLines={1}
            className="text-sm"
          >
            {offer.title}
          </Text>

          <Text
            numberOfLines={2}
            className="text-gray-500 text-xs mb-2"
          >
            {offer.description}
          </Text>

          {/* Rating */}
          <View className="flex-row justify-between items-center mb-2">

            <View className="flex-row items-center">
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

              <Text className="text-xs text-gray-400 ml-1">
                ({offer.reviewCount})
              </Text>
            </View>

            {hasCountdown && (
              <View className="flex-row items-center">
                <Users size={12} color="#888" />
                <Text className="text-[11px] ml-1">
                  {offer.clickCount} grabs
                </Text>
              </View>
            )}
          </View>

          {/* Bottom row */}
          <View className="flex-row items-center mb-3">

            {hasCountdown ? (
              <>
                <AlarmClock size={15} color="#E70606" />
                <Text type="paragraphBold" className="text-red-600 text-xs ml-1">
                  {formatCountdown(secondsLeft)}
                </Text>
              </> 
            ) : (
              <>
                <Users size={14} color="#888" />
                <Text className="text-xs ml-1">
                  {offer.clickCount} grabs
                </Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}