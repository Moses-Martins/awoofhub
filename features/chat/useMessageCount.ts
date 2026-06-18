import { useQuery } from "@tanstack/react-query";
import { getMessagesCountService } from "../../services/chat-service";
import { useUser } from "../user/useUser";

export const getMessagesCount = async (): Promise<number> => {
    const result = await getMessagesCountService();
    return result.data.unreadCount;
};


export const useMessageCount = () => {
    const { data: user } = useUser();
    
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['messages', 'count'],
        queryFn: () => getMessagesCount(),
        refetchInterval: 5000,
        enabled: !!user,
    });

    return {
        data,
        isFetching,
        isFetched
    };
};
