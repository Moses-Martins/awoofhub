import Loading from '@/components/loading/Loading';
import OfferCard from '@/components/offers/OfferCard';
import OfferListSkeleton from '@/components/offers/OfferListSkeleton';
import { About } from '@/components/profile/About';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { useOffersByUser } from '@/features/offers/useoffersByUser';
import { useUser } from '@/features/user/useUser';
import { useUserById } from '@/features/user/useUserById';
import { colors } from '@/styles/colors';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';

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
                    getLabelText={(name) => {
                        const str = String(name).toLowerCase();
                        return str.charAt(0).toUpperCase() + str.slice(1);
                    }}
                    labelStyle={{
                        margin: 0,
                        paddingBottom: 4,
                        textTransform: 'none',
                        paddingTop: 15,
                        textAlign: 'center',
                        width: screenWidth / tabCount,
                    }}
                />
            )}>

            <Tabs.Tab name="Profile">
                <Tabs.ScrollView>
                    <About profile={user} />
                </Tabs.ScrollView>
            </Tabs.Tab>

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
        </Tabs.Container>
    );
};