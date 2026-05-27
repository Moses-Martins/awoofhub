import { STREAM_API_KEY } from "@/config/constants";
import { getStreamChatToken } from "@/services/chat-service";
import { useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { useUser } from "../user/useUser";

export default function useInitializeChatClient() {
    const { data: user } = useUser();
    const [chatClient, setChatClient] = useState<StreamChat | null>(null)

    useEffect(() => {
        if (!user?.id) return;

        const client = StreamChat.getInstance(STREAM_API_KEY);
        const init = async () => {
            await client.connectUser(
                {
                    id: user.id,
                    name: user.name,
                    image: user.profileImageUrl || undefined,
                },
                async () => await getStreamChatToken()
            );

            setChatClient(client);
        };

        init();

        return () => {
            client.disconnectUser();
            setChatClient(null);
        };
    }, [user?.id]);

    return chatClient

}