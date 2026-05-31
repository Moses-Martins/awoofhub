import Protected from "@/components/protected/Protected";
import { Stack } from "expo-router";


export default function ProfileLayout() {
  return (
    <Protected>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Profile" }} />
      </Stack>
    </Protected>
  );
}
