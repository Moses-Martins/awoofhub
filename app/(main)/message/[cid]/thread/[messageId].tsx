import Loading from "@/components/loading/Loading";
import { useChatContext } from "@/context/ChatContext";
import { Stack } from "expo-router";
import { useHeaderHeight } from "expo-router/react-navigation";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel, Thread } from "stream-chat-expo";

export default function ThreadScreen() {
    const { channel, thread, setThread } = useChatContext();
    const headerHeight = useHeaderHeight();
    const headerHeightRef = useRef(headerHeight);

    if (!channel || !thread) {
        return (
            <SafeAreaView>
                <Loading />
            </SafeAreaView>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: "Thread" }} />
            <Channel
                channel={channel}
                keyboardVerticalOffset={headerHeightRef.current}
                topInset={headerHeightRef.current}
                thread={thread}
                threadList
            >
                <Thread onThreadDismount={() => setThread(null)} />
            </Channel>
        </>
    );
}