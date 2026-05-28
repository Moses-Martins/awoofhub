import { Stack } from "expo-router";

export default function OfferLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Offers' }} />
      <Stack.Screen name="[id]" options={{ title: 'Offer details' }} />
    </Stack>
  );
}
