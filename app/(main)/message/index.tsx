import Loading from "@/components/loading/Loading";
import { useChatContext } from "@/context/ChatContext";
import { useUser } from '@/features/user/useUser';
import { Stack, useRouter } from 'expo-router';
import { useMemo } from 'react';
import type { ChannelSort } from 'stream-chat';
import { ChannelList } from 'stream-chat-expo';

const sort: ChannelSort = {
    last_message_at: -1,
};

const options = {
    limit: 20,
    presence: true,
    state: true,
    watch: true,
};

export default function MessageScreen() {
    const { data: user, isLoading } = useUser();
      const router = useRouter();

      const { setChannel } = useChatContext();

    const filters = useMemo(() => {
        if (!user?.id) return null;
        return {
            members: {
                $in: [user.id],
            },
            type: "messaging",
        };
    }, [user?.id]);

    if (isLoading || !filters) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: "Channels" }} />
            <ChannelList
                filters={filters}
                options={options}
                sort={sort}
                onSelect={(channel) => {
                    setChannel(channel);
                    router.push(`/message/${channel.cid}`);
                }}
            />
        </>
    );
};