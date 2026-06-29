import { ChatWrapper } from "@/components/chat/ChatWrapper";
import { ChatProvider } from "@/context/ChatContext";
import { Stack } from "expo-router";

export default function MessageLayout() {

  return (
    <ChatWrapper>
      <ChatProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="[cid]" options={{ headerShown: false }} />
        </Stack>
      </ChatProvider>
    </ChatWrapper>
  );
}
