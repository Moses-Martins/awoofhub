import { View } from 'react-native';

export default function OfferListSkeleton() {
  return (
    // flex-1 lets it natively share the 2-column layout perfectly with its row partner
    <View className="flex-1 mb-[15px]">
      <View className="w-full aspect-square rounded-xl bg-gray-300" />
      <View>
        <View className="h-5 mt-[10px] bg-gray-300 rounded" />
        <View className="w-1/2 h-5 mt-[10px] bg-gray-300 rounded" />
      </View>
    </View>
  );
}