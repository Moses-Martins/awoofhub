import React from 'react';
import { View } from 'react-native';

interface Props {
  number: number;
}

export default function OfferListSkeleton({ number }: Props) {
  return (
    <View className="flex-row flex-wrap justify-between gap-3 px-3 flex-1">
      {[...Array(number)].map((_, i) => (
        <View className="w-[calc(50%-8px)] mb-[15px]" key={i}>
          <View className="w-full aspect-square rounded-xl bg-gray-300" />
          <View>
            <View className="h-5 mt-[10px] bg-gray-300" />
            <View className="w-1/2 h-5 mt-[10px] bg-gray-300" />
          </View>
        </View>
      ))}
    </View>
  );
}