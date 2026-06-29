import { Stack } from "expo-router";


export default function ProfileLayout() {
  return (
      <Stack>
        <Stack.Screen name="[username]" options={{ headerTitle: "Profile" }} />
        <Stack.Screen name="edit" options={{ headerTitle: "Edit" }} />
      </Stack>
  );
}
