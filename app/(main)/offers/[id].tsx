import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function OfferIdScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Offer {id}</Text>
    </View>
  );
}
