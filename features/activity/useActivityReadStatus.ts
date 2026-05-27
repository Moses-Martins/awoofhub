import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import ActivityService from "../../services/activity-service";
import { ActivityData } from "../../types/activity";
import { ApiResponse } from "../../types/api-response";

type ActivityOptions = {
    id: string;
};

export const markAsRead = async ({ id }: ActivityOptions): Promise<{}> => {
    const result = await ActivityService.markAsRead(id);
    return result.data
};

export function useActivityReadStatus({ id }: ActivityOptions) {
    const queryClient = useQueryClient();
    const queryKey = ['notifications']

    const { mutate } = useMutation({
        mutationFn: () => markAsRead({ id }),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previousNotifications = queryClient.getQueryData(queryKey);

            queryClient.setQueryData<InfiniteData<ApiResponse<ActivityData[]>>>(queryKey, (oldData) => {
                if (!oldData) return oldData

                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        data: page.data.map((activity) =>
                            activity.id === id
                                ? { ...activity, isRead: true }
                                : activity
                        ),
                    })),
                };
            });
            return { previousNotifications };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousNotifications);
        },
    });

    return { markAsRead: mutate };

}



