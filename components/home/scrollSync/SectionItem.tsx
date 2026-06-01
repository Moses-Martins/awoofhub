import Loading from '@/components/loading/Loading';
import OfferList from '@/components/offers/OfferList';
import { useOffersByCategory } from '@/features/offers/useOffersByCategory';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

interface Props {
    item: any;
    onLayout: (event: LayoutChangeEvent, index: number) => void;
    index: number;
}

export default function SectionItem({ item, onLayout, index }: Props) {

    const { data: offers = [], isFetching } = useOffersByCategory({
        categoryId: item.id,
        page: 1,
        limit: 4
    });

    return (
        <View className="pb-5" onLayout={e => onLayout(e, index)}>
            {/* Header */}
            <View className="px-5 py-3 flex flex-row justify-between items-start">
                <Text className="text-[18px] font-bold text-[#1C1C1E] mb-1">
                    {item.name}
                </Text>

                <Link href={`/offers?category=${item.slug}`} asChild>
                    <Pressable className="flex-row items-center gap-1">
                        <Text className="text-orange-600 font-bold text-sm">
                            View all
                        </Text>
                        <Feather name="arrow-right" size={16} color="#EA580C" />
                    </Pressable>
                </Link>
            </View>

            {isFetching && offers.length === 0 ? (
                <View className="p-6 items-center"><Loading /></View>
            ) : (
                <OfferList offers={offers} />
            )}

        </View>
    );
}