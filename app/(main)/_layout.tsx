import Protected from "@/components/protected/Protected";
import { Stack } from "expo-router";


export default function MainLayout() {

  return (
    <Protected>
      <Stack>
        <Stack.Screen name="offers" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="profile"  options={{ headerShown: false }} />
      </Stack>
    </Protected>
  );
}
