import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";


import { Offer } from "@/types/offer";
import { formatDate } from "@/utils/formatDate";


interface Props {
  offer: Offer;
}

export default function Action({ offer }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!offer.couponCode) return;

    await Clipboard.setStringAsync(offer.couponCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleOpenDeal = async () => {
    if (!offer.dealUrl) return;

    const supported = await Linking.canOpenURL(offer.dealUrl);

    if (supported) {
      await Linking.openURL(offer.dealUrl);
    }
  };

  const getActionText = () => {
    switch (offer.category.name) {
      case "Coupons":
        return "Go to Site";
      case "Cashback":
        return "Activate Cashback";
      case "Freebies":
        return "Claim Freebie";
      case "Student Deals":
        return "Unlock Deal";
      case "Free Trials":
        return "Start Trial";
      case "Discount":
        return "Get Deal";
      default:
        return "Get Offer";
    }
  };

  return (
    <View className="flex-row flex-wrap justify-around gap-3 py-6 my-6 border-t border-b border-gray-300">

      <View className="items-center gap-2">
        <FontAwesome name="calendar-minus-o" size={24} color="#4E260C" />
        
        <Text className="text-base font-baloo-bold text-gray-800">
          Expiring
        </Text>

        <Text className="text-sm font-mont text-gray-900">
          {formatDate(offer.endDate)}
        </Text>
      </View>

      {/* Coupon */}
      {offer.category.name === "Coupons" && (
        <View className="items-center gap-2 mb-10">
          <Text className="text-base font-baloo-bold text-gray-800">
            Use Coupon Code
          </Text>

          <View className="relative">
            <Pressable
              onPress={handleCopy}
              className="flex-row items-center gap-2 bg-orange-600 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-bold uppercase">
                {offer.couponCode}
              </Text>

              <MaterialIcons
                name="content-copy"
                size={18}
                color="white"
              />
            </Pressable>

            {copied && (
              <View className="absolute -top-8 right-0 bg-white px-2 py-1 rounded shadow">
                <Text className="text-xs text-green-600">
                  Copied!
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Deal Button */}
      <View className="items-center gap-2">
        <Text className="text-base font-baloo-bold text-gray-800">
          Unlock
        </Text>

        <Pressable
          onPress={handleOpenDeal}
          className="bg-green-800 px-8 py-2 rounded-lg items-center"
        >
          <Text className="text-white font-bold">
            {getActionText()}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}