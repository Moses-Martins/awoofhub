import useInitializeChatClient from "@/features/chat/useInitializeChatClient";
import { ReactNode } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat, OverlayProvider } from "stream-chat-expo";

export const ChatWrapper = ({ children }: { children: ReactNode }) => {
    const chatClient = useInitializeChatClient();

    if (!chatClient) {
        return (
            <SafeAreaView>
                <Text>Loading chat ...</Text>
            </SafeAreaView>
        );
    }

    return (
        <OverlayProvider>
            <Chat client={chatClient}>{children}</Chat>
        </OverlayProvider>
    )
};