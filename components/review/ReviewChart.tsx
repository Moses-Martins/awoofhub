import { Offer } from "@/types/offer";
import { Star } from 'lucide-react-native';
import { Text, View } from "react-native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';



interface Props {
    offer: Offer;
}

export default function ReviewChart({ offer }: Props) {
    const { ratingDistribution, avgRating, reviewCount } = offer;

    const displayData = Object.entries(ratingDistribution)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([rating, count]) => {
            const percentage =
                reviewCount > 0
                    ? Math.round((Number(count) / reviewCount) * 100)
                    : 0;

            return {
                label: `${rating} Star`,
                percentage,
            };
        });

    return (
        <View className="py-6 border-t border-b border-gray-300">
            <View className="mb-5">
                <Text className="text-lg font-baloo-bold text-gray-900">Average Rating</Text>
                <View className="flex-row items-center gap-2 my-1">
                    <StarRatingDisplay
                        rating={offer.avgRating}
                        maxStars={5}
                        starSize={15}
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
                    <Text className="text-base font-baloo-bold text-gray-900">
                        {avgRating} out of 5
                    </Text>
                </View>
                <Text className="text-base font-baloo-bold text-gray-500">
                    {reviewCount.toLocaleString()} total ratings
                </Text>
            </View>

            <View className="self-start border border-gray-200 rounded-2xl p-5 bg-white w-full">

                <View className="gap-y-3">
                    {displayData.map((item, index) => (
                        <View
                            key={index}
                            className="flex-row items-center justify-between"
                        >
                            {/* Left label */}
                            <Text className="text-gray-500 font-mont font-medium text-sm w-14">
                                {item.label}
                            </Text>

                            {/* Bar track */}
                            <View className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden mx-3 justify-center">
                                {item.percentage > 0 ? (
                                    <View
                                        style={{ width: `${item.percentage}%` }}
                                        className="h-full bg-[#FFA41C] rounded-full"
                                    />
                                ) : (
                                    <View className="h-full w-0" />
                                )}
                            </View>

                            {/* Percentage */}
                            <View className="w-10 items-end">
                                {item.percentage > 0 ? (
                                    <Text className="text-gray-800 font-semibold text-sm">
                                        {item.percentage}%
                                    </Text>
                                ) : (
                                    <Text className="text-gray-300 text-sm">0%</Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}