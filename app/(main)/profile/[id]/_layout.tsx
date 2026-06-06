import ProfilePageWrapper from "@/components/profile/ProfilePageWrapper";
import { Stack, useLocalSearchParams } from "expo-router";


export default function IdLayout() {
    const { id: rawId } = useLocalSearchParams();
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    return (
        <ProfilePageWrapper userId={id}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="offers" options={{ headerShown: false }} />
            </Stack>
        </ProfilePageWrapper>
    );
}
