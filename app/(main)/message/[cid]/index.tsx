import Loading from "@/components/loading/Loading";
import { useChatContext } from "@/context/ChatContext";
import { Stack, useRouter } from "expo-router";
import { useHeaderHeight } from "expo-router/react-navigation";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel, MessageComposer, MessageList } from "stream-chat-expo";

export default function ChannelScreen() {
  const router = useRouter();
  const { channel, thread, setThread } = useChatContext();
  const headerHeight = useHeaderHeight();
  const headerHeightRef = useRef(headerHeight);

  if (!channel) {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  }
  return (
    <>
      <Stack.Screen options={{ title: "Channel" }} />
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeightRef.current}
        topInset={headerHeightRef.current}
        thread={thread}
      >
        <MessageList
          onThreadSelect={(message) => {
            setThread(message);
            router.push(`/message/${channel.cid}/thread/${message.id}`);
          }}
        />
        <MessageComposer />
      </Channel>
    </>
  );
}