import Loading from '@/components/loading/Loading';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { useUser } from '@/features/user/useUser';
import { useUserById } from '@/features/user/useUserById';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';

import OfferCard from '@/components/offers/OfferCard';
import OfferListSkeleton from '@/components/offers/OfferListSkeleton';
import { useOffersByUser } from '@/features/offers/useoffersByUser';
import { colors } from '@/styles/colors';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const tabCount = 2;
const HEADER_SPACE = 70;


export default function ProfileScreen() {

    const { id: rawId } = useLocalSearchParams();
    const id = Array.isArray(rawId) ? rawId[0] : rawId;


    const { data: currentUser } = useUser();
    const { data: user, isLoading: isUserLoading } = useUserById({ id });

    const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useOffersByUser({
        userId: id, search: "", category: "", minRating: 0, createdFrom: "", createdTo: "", limit: 8
    });

    const allOffers = data?.pages.flatMap((page) => page.data) ?? [];


    if (isUserLoading) {
        return <Loading />;
    }

    if (!user) {
        return (
            <View className="px-6 pt-14">
                <Text className="text-center text-gray-500">
                    User not found.
                </Text>
            </View>
        );
    }

    const isOwnProfile = currentUser?.id === user.id;

    const renderProfileHeader = () => (
        <ProfileHeader
            isOwnProfile={isOwnProfile}
            profile={user}
        />
    )

    return (
        <Tabs.Container
            renderHeader={renderProfileHeader}
            renderTabBar={(props) => (
                <MaterialTabBar
                    {...props}
                    labelStyle={{
                        margin: 0,
                        paddingBottom: 4,
                        paddingTop: 15,
                        textAlign: 'center',
                        width: screenWidth / tabCount,
                    }}
                />
            )}>

            <Tabs.Tab name="Offers">
                <Tabs.FlatList
                    nestedScrollEnabled
                    columnWrapperClassName="gap-3"
                    contentContainerStyle={{
                        paddingTop: 320,
                    }}
                    contentContainerClassName="gap-3 px-3"
                    data={allOffers}
                    numColumns={2}
                    keyExtractor={(item) => item.id ?? ''}
                    renderItem={({ item }) => <OfferCard offer={item} />}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => (
                        <View style={{ paddingVertical: 20, alignItems: "center" }}>
                            {isFetchingNextPage && <ActivityIndicator size="large" color={colors.primary} />}
                            {!hasNextPage && allOffers.length > 0 && <Text>No more offers</Text>}
                        </View>
                    )}

                    ListEmptyComponent={() => {
                        if (isLoading) {
                            return (
                                <View style={{ paddingTop: HEADER_SPACE }}>
                                    <OfferListSkeleton number={8} />
                                </View>
                            );
                        }

                        if (!isFetching && allOffers.length === 0) {
                            return (
                                <View style={{ paddingTop: HEADER_SPACE }}>
                                    <Text className="text-gray-500 text-center">
                                        No offers available.
                                    </Text>
                                </View>
                            );
                        }

                        return null;
                    }}
                />
            </Tabs.Tab>

            <Tabs.Tab name="Profile">
                <Tabs.ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Text className="text-gray-500 text-center">This is the profile screen</Text>
                </Tabs.ScrollView>
            </Tabs.Tab>

        </Tabs.Container>
    );
};