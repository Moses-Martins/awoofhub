import Header from "@/components/header/Header";
import Protected from "@/components/protected/Protected";
import { Stack } from "expo-router";


export default function OfferLayout() {
  
  return (
    <Protected>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerTitle: "Offer Detail" }} />
        <Stack.Screen
          name="index"
          options={{
            header: () => <Header isHome={false} />
          }}
        />
      </Stack>
    </Protected>
  );
}
