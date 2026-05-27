import { Offer } from '@/types/offer';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import OfferCard from './OfferCard';


interface Props {
    offers: Offer[];
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
}

export default function OfferInfiniteList({ offers, hasNextPage, fetchNextPage, isFetchingNextPage }: Props) {

    return (
        <FlatList
            contentContainerClassName="gap-3 px-3 pb-10"
            columnWrapperClassName="gap-3"
            data={offers}
            numColumns={2}
            renderItem={({ item }) => (<OfferCard offer={item} />)}
            keyExtractor={item => item.id ?? ''}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (
                <View style={{ paddingVertical: 20, alignItems: "center" }}>
                    {isFetchingNextPage && (
                        <ActivityIndicator size="large" />
                    )}

                    {!hasNextPage && offers.length > 0 && (
                        <Text>No more offers</Text>
                    )}
                </View>
            )}
        />
    );
};
