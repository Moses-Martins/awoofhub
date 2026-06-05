import Dialog from '@/components/dialog/Dialog';
import OfferInfiniteList from '@/components/offers/OfferInfiniteList';
import OfferListSkeleton from '@/components/offers/OfferListSkeleton';
import { useCategory } from '@/features/category/useCategory';
import { useFilter } from "@/features/offers/useFilter";
import { useOffers } from '@/features/offers/useOffers';
import Ionicons from '@expo/vector-icons/Ionicons';
import dayjs from "dayjs";
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function OffersScreen() {
    const { q, category, minRating, createdFrom, createdTo } = useLocalSearchParams<{
        q?: string
        category?: string;
        minRating?: string;
        createdFrom?: string;
        createdTo?: string;
    }>();

    const { data: categories, isFetching: isCategoryFetching } = useCategory();
    const updateFilter = useFilter();
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useOffers({
        search: q ?? "",
        category: category ?? "",
        minRating: minRating ?? "",
        createdFrom: createdFrom ?? "",
        createdTo: createdTo ?? "",
        limit: 8,
    });

    const allOffers = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? [];
    }, [data]);

    if (isCategoryFetching) {
        return <OfferListSkeleton number={8} />
    }



    return (
        <View className="flex-1 bg-white">
            <View className="py-2.5 bg-white flex-row justify-between items-center py-2 px-5" style={{ shadowColor: '#000', shadowOffset: { width: 1, height: 3 }, shadowOpacity: 0.1, elevation: 5 }}>
                <TouchableOpacity className="flex-row items-center" onPress={() => actionSheetRef.current?.show()}>
                    <Ionicons name="filter" size={22} color="black" />
                    <Text className="text-[14px] mx-4 font-semibold text-black">
                        Filters
                    </Text>
                </TouchableOpacity>
                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={() => setShowFromPicker(true)}
                        className="border border-gray-200 rounded-xl p-2.5 items-center bg-[#F9F9F9]"
                    >
                        <Text className="text-[12px] text-gray-700 font-medium">
                            From:{" "}
                            {createdFrom
                                ? dayjs(createdFrom).format("MMM D, YYYY")
                                : "Start"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setShowToPicker(true)}
                        className="border border-gray-200 rounded-xl p-2.5 items-center bg-[#F9F9F9]"
                    >
                        <Text className="text-[12px] text-gray-700 font-medium">
                            To:{" "}
                            {createdTo
                                ? dayjs(createdTo).format("MMM D, YYYY")
                                : "End"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={showFromPicker}
                mode="date"
                onConfirm={(date) => {
                    updateFilter("createdFrom", date.toISOString().split("T")[0]);
                    setShowFromPicker(false);
                }}
                onCancel={() => setShowFromPicker(false)}
            />

            <DateTimePickerModal
                isVisible={showToPicker}
                mode="date"
                onConfirm={(date) => {
                    updateFilter("createdTo", date.toISOString().split("T")[0]);
                    setShowToPicker(false);
                }}
                onCancel={() => setShowToPicker(false)}
            />



            <View className="flex-1 pt-4">
                {isLoading && <OfferListSkeleton number={8} />}

                {!isLoading && !isFetching && allOffers.length === 0 && (
                    <Text className="text-gray-500 text-center">No offers available.</Text>
                )}

                {isError && <Text className="text-red-500 text-center">{error?.message}</Text>}

                {!isLoading && allOffers.length > 0 &&
                    <OfferInfiniteList
                        offers={allOffers}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                }
            </View>
            <Dialog actionSheetRef={actionSheetRef}>
                <View className="p-4 gap-4">

                    {/* CATEGORY */}
                    <View>
                        <Text className="text-sm font-semibold mb-2">Category</Text>

                        <View className="flex-row flex-wrap gap-2">
                            <TouchableOpacity
                                onPress={() => updateFilter("category", undefined)}
                                className={`px-3 py-2 rounded-full border ${!category ? "bg-black" : "bg-white"
                                    }`}
                            >
                                <Text className={!category ? "text-white" : "text-black"}>
                                    All
                                </Text>
                            </TouchableOpacity>

                            {categories?.map((cat) => {
                                const active = category === cat.slug;

                                return (
                                    <TouchableOpacity
                                        key={cat.id}
                                        onPress={() => updateFilter("category", cat.slug)}
                                        className={`px-3 py-2 rounded-full border ${active ? "bg-black" : "bg-white"
                                            }`}
                                    >
                                        <Text className={active ? "text-white" : "text-black"}>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* MIN RATING */}
                    <View>
                        <Text className="text-sm font-semibold mb-2">Min Rating</Text>

                        <View className="flex-row flex-wrap gap-2">
                            {[0, 1, 2, 3, 4, 5].map((r) => {
                                const active = Number(minRating ?? 0) === r;

                                return (
                                    <TouchableOpacity
                                        key={r}
                                        onPress={() => updateFilter("minRating", r)}
                                        className={`px-3 py-2 rounded-full border ${active ? "bg-black" : "bg-white"
                                            }`}
                                    >
                                        <Text className={active ? "text-white" : "text-black"}>
                                            {r === 0 ? "All" : "⭐".repeat(r)}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* CLEAR */}
                    <TouchableOpacity
                        onPress={() =>
                            updateFilter({
                                category: undefined,
                                minRating: undefined,
                                createdFrom: undefined,
                                createdTo: undefined,
                            })
                        }
                        className="mt-2 py-2 border border-red-400 rounded-md"
                    >
                        <Text className="text-red-400 text-center">Clear Filters</Text>
                    </TouchableOpacity>

                </View>
            </Dialog>
        </View>
    );
};