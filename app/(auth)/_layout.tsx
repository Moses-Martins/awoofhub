import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function AuthLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Login' , headerShown: false}} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' ,headerShown: false}} />
    </Stack>
    </GestureHandlerRootView>
  );
}
