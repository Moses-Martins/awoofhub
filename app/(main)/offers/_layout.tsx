import Header from "@/components/header/Header";
import Protected from "@/components/protected/Protected";
import { Stack } from "expo-router";
import { useState } from "react";


export default function MainLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  return (
    <Protected>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerTitle: "Offer Details" }} />
        <Stack.Screen
          name="index"
          options={{
            header: () => <Header canGoBack={true} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
          }}
        />
      </Stack>
    </Protected>
  );
}
