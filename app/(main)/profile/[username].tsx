import Loading from '@/components/loading/Loading';
import OfferCard from '@/components/offers/OfferCard';
import OfferListSkeleton from '@/components/offers/OfferListSkeleton';
import { About } from '@/components/profile/About';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { useOffersByUsername } from '@/features/offers/useOffersByUsername';
import { useUser } from '@/features/user/useUser';
import { useUserByUsername } from '@/features/user/useUserByUsername';
import { colors } from '@/styles/colors';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';

const screenWidth = Dimensions.get('window').width;
const tabCount = 2;
const HEADER_SPACE = 70;


export default function ProfileScreen() {

    const { username: rawUsername } = useLocalSearchParams();
    const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername;


    const { data: currentUser } = useUser();
    const { data: user, isLoading: isUserLoading } = useUserByUsername({ username });

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useOffersByUsername({
        username, search: "", category: "", minRating: 0, createdFrom: "", createdTo: "", limit: 8
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
                        if (isFetching) {
                            return (
                                <View style={{ paddingTop: HEADER_SPACE }}>
                                    <OfferListSkeleton />
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