'use client'
import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useInfiniteQuery } from '@tanstack/react-query';

type GetTrendingOffersOptions = {
    page?: number,
    limit: number,
};

export const getTrendingOffers = async ({ page = 1, limit }: GetTrendingOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.trendingOffers(page, limit);
};

export const useTrendingOffers = ({ limit = 8 }: GetTrendingOffersOptions) => {
    const { data, isFetchingNextPage, isLoading, isFetched, isFetching, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ["trendingOffers", limit],
        queryFn: ({ pageParam = 1 }) => getTrendingOffers({ page: pageParam, limit }),

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
        isFetchingNextPage, 
        isLoading, 
        isFetching, 
        isFetched,
        fetchNextPage, 
        hasNextPage, 
        isError, 
        error
    };
};