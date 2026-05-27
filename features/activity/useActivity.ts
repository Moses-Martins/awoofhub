import { useInfiniteQuery } from '@tanstack/react-query';
import ActivityService from '../../services/activity-service';
import { ActivityData } from '../../types/activity';
import { ApiResponse } from '../../types/api-response';


type GetActivityOptions = {
    page?: number,
    limit: number,
};

export const getActivity = ({ page = 1, limit }: GetActivityOptions): Promise<ApiResponse<ActivityData[]>> => {
    return ActivityService.getAllActivities(page, limit);
};

export const useActivity = ({ limit = 6 }: GetActivityOptions) => {
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: ({ pageParam = 1 }) => getActivity({ page: pageParam, limit }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;

            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,

    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError, 
        error
    };
};

