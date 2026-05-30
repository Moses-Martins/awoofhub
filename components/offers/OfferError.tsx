import { Text, View } from 'react-native';

export default function OfferError() {
    return (
        <View className="flex flex-col items-center justify-center min-h-[50%] px-4">
            <Text className="text-xl font-bold text-black">
                Oops! Something went wrong
            </Text>
            <Text className="mt-2 text-gray-600 text-center">
                We couldn't load the offers. Please try again later.
            </Text>
        </View>
    );
}