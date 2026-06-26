import Protected from "@/components/protected/Protected";
import { Stack } from "expo-router";


export default function MessageLayout() {
  
  return (
    <Protected>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Message" }} />
      </Stack>
    </Protected>
  );
}
