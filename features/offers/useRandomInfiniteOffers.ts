import { useInfiniteQuery } from '@tanstack/react-query';
import OfferService from '../../services/offer-service';
import { ApiResponse } from '../../types/api-response';
import { Offer } from '../../types/offer';


type GetRandomOffersOptions = {
    page?: number,
    limit: number,
};

export const getRandomInfiteOffers = ({ page = 1, limit }: GetRandomOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.randomOffers(page, limit);
};

export const useRandomInfiniteOffers = ({ limit = 8 }: GetRandomOffersOptions) => {
    const { data, fetchNextPage, isLoading, isFetched, hasNextPage, isFetching, isFetchingNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['offers', 'random', limit],
        queryFn: ({ pageParam = 1 }) => getRandomInfiteOffers({ page: pageParam, limit }),

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
        isFetched,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError, 
        error
    };
};

