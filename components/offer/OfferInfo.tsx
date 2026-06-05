import { colors } from "@/styles/colors";
import { Offer } from "@/types/offer";
import Ionicons from '@expo/vector-icons/Ionicons';
import { CheckCircle2, Star } from 'lucide-react-native';
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import Comment from "../comment/Comment";
import MessageButton from "../message/MessageButton";
import Review from "../review/Review";
import ReviewChart from "../review/ReviewChart";
import WishlistButton from "../wishlist/WishlistButton";
import Action from "./Action";
import BusinessLink from "./BusinessLink";


interface Props {
    offer: Offer;
}

export default function OfferInfo({ offer }: Props) {

    const [isReportOpen, setIsReportOpen] = useState(false);

    return (
        <ScrollView className="pb-10 px-4 bg-white">

            <View className="mt-4 bg-gray-100 rounded-2xl w-full">
                <Image
                    source={{ uri: offer.imageUrl }}
                    className="w-full aspect-[10/9] p-10"
                    resizeMode="contain"
                />
            </View>

            <View className="w-full mt-4 flex flex-row gap-3">
                <MessageButton targetUserId={offer.business.id} className="flex-1">
                    <View className="bg-orange-600 rounded-lg py-2 px-6 flex items-center justify-center">
                        <Text className="text-white text-base font-bold">Message</Text>
                    </View>
                </MessageButton>

                <Pressable
                    onPress={() => setIsReportOpen(true)}
                    className="w-1/5 border border-red-500 rounded-lg py-2 flex items-center justify-center active:bg-red-500"
                >
                    <Text className="text-red-500 text-sm font-bold">
                        Report
                    </Text>
                </Pressable>
            </View>

            <View className="flex flex-row justify-between items-center my-6">
                <BusinessLink offer={offer} />

                <Text className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded animate-pulse">
                    Available
                </Text>
            </View>

            <Text className="text-xl font-baloo-bold mb-1">
                {offer.title}
            </Text>

            <View className="flex-row items-center mb-4">
                <StarRatingDisplay
                    rating={offer.avgRating}
                    maxStars={5}
                    starSize={18}
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

                <Text className="text-gray-400 text-base font-mont ml-2">
                    ({offer.reviewCount} reviews)
                </Text>
            </View>

            <View className="flex-row justify-between items-center mb-4">

                <View className="flex-row items-center gap-1">
                    <Ionicons name="location-outline" size={18} color={colors.primary} />

                    <Text className="text-gray-400 font-mont text-sm">
                        {offer.location}
                    </Text>
                </View>

                <WishlistButton
                    size={28}
                    offerId={offer.id}
                />
            </View>

            <View className="text-sm leading-relaxed text-gray-600">
                <Text className="text-xl font-baloo-bold text-gray-900 mb-1">
                    Details
                </Text>

                <Text className="mb-5 font-mont break-words text-sm text-gray-600">
                    {offer.description}
                </Text>

                <View className="self-start bg-orange-100 border border-orange-100 px-2 py-1 rounded-md">
                    <Text className="text-orange-600 font-mont-bold text-sm">
                        {offer.value}
                    </Text>
                </View>
            </View>

            <Action offer={offer} />

            <View className="text-sm leading-relaxed text-gray-600">
                <Text className="text-xl font-baloo-bold text-gray-900 mb-1">
                    Terms & Conditions
                </Text>

                <Text className="mb-5 font-mont break-words text-sm text-gray-600">
                    {offer.termsAndConditions}
                </Text>
            </View>

            <View className="py-6 border-t border-b border-gray-300">
                <Text className="font-baloo-bold text-base text-gray-800 mb-3">
                    Safety Tips
                </Text>

                <View className="gap-2">
                    <View className="flex-row items-center">
                        <CheckCircle2 size={16} color="#22c55e" />
                        <Text className="ml-2 text-xs font-mont text-gray-500">
                            86% positive ratings from 100K+ customers
                        </Text>
                    </View>

                    <View className="flex-row items-center">
                        <CheckCircle2 size={16} color="#22c55e" />
                        <Text className="ml-2 text-xs font-mont text-gray-500">
                            10K+ recent orders from this brand
                        </Text>
                    </View>

                    <View className="flex-row items-center">
                        <CheckCircle2 size={16} color="#22c55e" />
                        <Text className="ml-2 text-xs font-mont text-gray-500">
                            2+ years on AwoofHub
                        </Text>
                    </View>
                </View>
            </View>

            <View className="items-center px-4 py-5">
                <Text className="font-baloo-bold text-lg text-gray-800">
                    Leave a Rating
                </Text>

                <Text className="text-gray-400 text-sm font-mont mb-4 text-center">
                    Rate your experience about this offer
                </Text>

                <Review offer={offer} />

            </View>

            <ReviewChart offer={offer} />

            <Comment offer={offer} />

        </ScrollView>

    );
}